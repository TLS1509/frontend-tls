import zipfile, os, sys
import xml.etree.ElementTree as ET

A = "assets"
FONTS = [
    ("ppt/fonts/font1.fntdata", "rId90", f"{A}/LS-Regular.fntdata", "League Spartan", "regular"),
    ("ppt/fonts/font2.fntdata", "rId91", f"{A}/LS-Bold.fntdata",    "League Spartan", "bold"),
    ("ppt/fonts/font3.fntdata", "rId92", f"{A}/NU-Regular.fntdata", "Nunito",         "regular"),
    ("ppt/fonts/font4.fntdata", "rId93", f"{A}/NU-Bold.fntdata",    "Nunito",         "bold"),
]
CT_ANCHOR = '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
CT_ADD = '<Default Extension="fntdata" ContentType="application/x-fontdata"/>'
REL_TYPE = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/font"

def patch_ct(xml):
    return xml.replace(CT_ANCHOR, CT_ANCHOR + CT_ADD, 1)

def patch_rels(xml):
    rels = "".join(f'<Relationship Id="{rid}" Type="{REL_TYPE}" Target="fonts/{os.path.basename(part)}"/>'
                   for part, rid, *_ in FONTS)
    return xml.replace("</Relationships>", rels + "</Relationships>", 1)

def patch_pres(xml):
    xml = xml.replace('saveSubsetFonts="1"', 'embedTrueTypeFonts="1" saveSubsetFonts="0"', 1)
    groups, order = {}, []
    for part, rid, _f, tf, slot in FONTS:
        groups.setdefault(tf, {});
        if tf not in order: order.append(tf)
        groups[tf][slot] = rid
    blocks = ""
    for tf in order:
        slots = "".join(f'<p:{slot} r:id="{rid}"/>' for slot, rid in groups[tf].items())
        blocks += f'<p:embeddedFont><p:font typeface="{tf}"/>{slots}</p:embeddedFont>'
    return xml.replace('<p:defaultTextStyle>', f'<p:embeddedFontLst>{blocks}</p:embeddedFontLst><p:defaultTextStyle>', 1)

def embed(src):
    out = src.replace(".pptx", "-embedded.pptx")
    zin = zipfile.ZipFile(src, "r"); zout = zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED)
    for item in zin.infolist():
        data = zin.read(item.filename)
        if item.filename == "[Content_Types].xml": data = patch_ct(data.decode()).encode()
        elif item.filename == "ppt/_rels/presentation.xml.rels": data = patch_rels(data.decode()).encode()
        elif item.filename == "ppt/presentation.xml": data = patch_pres(data.decode()).encode()
        zout.writestr(item, data)
    for part, _rid, fontfile, *_ in FONTS:
        with open(fontfile, "rb") as fh: zout.writestr(part, fh.read())
    zin.close(); zout.close()
    z = zipfile.ZipFile(out, "r")
    for p in ["[Content_Types].xml", "ppt/_rels/presentation.xml.rels", "ppt/presentation.xml"]:
        ET.fromstring(z.read(p))
    z.close()
    print(f"embedded -> {out} ({os.path.getsize(out)} bytes)")

for f in sys.argv[1:]:
    embed(f)
