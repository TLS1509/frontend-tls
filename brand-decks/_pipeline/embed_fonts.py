import zipfile, shutil, os
import xml.etree.ElementTree as ET

SRC = "TLS-gabarits-echantillon.pptx"
OUT = "TLS-gabarits-echantillon-embedded.pptx"
A = "assets"

# part name -> (rId, font file, typeface, slot)
FONTS = [
    ("ppt/fonts/font1.fntdata", "rId10", f"{A}/LS-Regular.fntdata", "League Spartan", "regular"),
    ("ppt/fonts/font2.fntdata", "rId11", f"{A}/LS-Bold.fntdata",    "League Spartan", "bold"),
    ("ppt/fonts/font3.fntdata", "rId12", f"{A}/NU-Regular.fntdata", "Nunito",         "regular"),
    ("ppt/fonts/font4.fntdata", "rId13", f"{A}/NU-Bold.fntdata",    "Nunito",         "bold"),
]

CT_ANCHOR = '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
CT_ADD = '<Default Extension="fntdata" ContentType="application/x-fontdata"/>'

REL_TYPE = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/font"

def patch_content_types(xml):
    assert CT_ANCHOR in xml, "content-types anchor not found"
    return xml.replace(CT_ANCHOR, CT_ANCHOR + CT_ADD, 1)

def patch_rels(xml):
    rels = "".join(
        f'<Relationship Id="{rid}" Type="{REL_TYPE}" Target="fonts/{os.path.basename(part)}"/>'
        for part, rid, _f, _tf, _slot in FONTS
    )
    return xml.replace("</Relationships>", rels + "</Relationships>", 1)

def patch_presentation(xml):
    # 1) embed flag (full fonts -> saveSubsetFonts 0)
    xml = xml.replace('saveSubsetFonts="1"', 'embedTrueTypeFonts="1" saveSubsetFonts="0"', 1)
    # 2) build embeddedFontLst grouped by typeface (order preserved)
    groups = {}
    order = []
    for part, rid, _f, tf, slot in FONTS:
        if tf not in groups:
            groups[tf] = {}
            order.append(tf)
        groups[tf][slot] = rid
    blocks = ""
    for tf in order:
        slots = "".join(f'<p:{slot} r:id="{rid}"/>' for slot, rid in groups[tf].items())
        blocks += f'<p:embeddedFont><p:font typeface="{tf}"/>{slots}</p:embeddedFont>'
    efl = f'<p:embeddedFontLst>{blocks}</p:embeddedFontLst>'
    # insert after notesSz, before defaultTextStyle (schema-correct position)
    anchor = '<p:defaultTextStyle>'
    assert anchor in xml, "defaultTextStyle anchor not found"
    return xml.replace(anchor, efl + anchor, 1)

zin = zipfile.ZipFile(SRC, "r")
zout = zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED)

for item in zin.infolist():
    data = zin.read(item.filename)
    if item.filename == "[Content_Types].xml":
        data = patch_content_types(data.decode("utf-8")).encode("utf-8")
    elif item.filename == "ppt/_rels/presentation.xml.rels":
        data = patch_rels(data.decode("utf-8")).encode("utf-8")
    elif item.filename == "ppt/presentation.xml":
        data = patch_presentation(data.decode("utf-8")).encode("utf-8")
    zout.writestr(item, data)

for part, _rid, fontfile, _tf, _slot in FONTS:
    with open(fontfile, "rb") as fh:
        zout.writestr(part, fh.read())

zin.close(); zout.close()

# validate well-formedness of the 3 patched XML parts
z = zipfile.ZipFile(OUT, "r")
for p in ["[Content_Types].xml", "ppt/_rels/presentation.xml.rels", "ppt/presentation.xml"]:
    ET.fromstring(z.read(p))
names = z.namelist()
assert all(part in names for part, *_ in FONTS), "font parts missing"
z.close()
sz = os.path.getsize(OUT)
print(f"OK embedded -> {OUT} ({sz} bytes, +{len(FONTS)} fonts)")
