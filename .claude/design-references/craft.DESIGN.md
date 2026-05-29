# DESIGN.md - Craft Design System

## Visual Identity & Philosophy

Craft is a premium note-taking and document creation platform emphasizing flexibility, visual hierarchy, and sophisticated dark-mode design. The visual language prioritizes content over chrome — elegant typography, generous whitespace, and a refined palette that feels premium yet approachable.

**Core Values:**
- **Content First**: Minimal UI, maximum writing space
- **Craftsmanship**: Refined details, premium feel throughout
- **Flexibility**: Cards, documents, journals coexist seamlessly
- **Dark Excellence**: Purpose-built dark mode, not inverted light

---

## Color Palette

| Element | Light | Dark |
|---------|-------|------|
| Primary (Blue) | `#0066FF` | `#0066FF` |
| Primary Hover | `#0052CC` | `#0052CC` |
| Accent Purple | `#8B5CF6` | `#8B5CF6` |
| Accent Orange | `#FF9500` | `#FF9500` |
| Background | `#FFFFFF` | `#1A1A1A` |
| Surface/Cards | `#F7F7F7` | `#262626` |
| Hover | — | `#333333` |
| Text Primary | `#1A1A1A` | `#F5F5F5` |
| Text Secondary | `#666666` | `#A8A8A8` |
| Divider | `#E8E8E8` | `#3E3E3E` |
| Success | `#10B981` | `#10B981` |
| Warning | `#FF9500` | `#FF9500` |
| Error | `#EF4444` | `#EF4444` |

---

## Typography

| Role | Font | Size | Weight |
|------|------|------|--------|
| Display | Inter | 48–56px | 700 |
| H1 | Inter | 32px | 600 |
| H2 | Inter | 28px | 600 |
| H3 | Inter | 24px | 600 |
| H4 | Inter | 20px | 500 |
| Body Large | Inter | 18px | 400 |
| Body | Inter | 16px | 400 |
| Small | Inter | 14px | 400 |
| Caption | Inter | 13px | 400 |
| Label | Inter | 12px | 500 |
| Code | SF Mono | 14px | 400 |

**Line height:** 1.6 (body) · 1.3 (headings) · 1.5 (code)

---

## Spacing & Layout

- **Base unit:** 8px
- Document max-width: 800px (optimal line length)
- Left sidebar: 280px
- Right sidebar: 320px
- Sidebars collapse <1200px
- Mobile: full-width single column
- Desktop padding: 48px

---

## Component Patterns

### Card/Note Container
```
Background: #262626 (dark)
Border-radius: 12px
Border: 1px solid #3E3E3E
Padding: 16px
Shadow: 0 2px 8px rgba(0,0,0,0.3)
Hover: background #333333, subtle lift
Title: 16px semibold, white
Preview: 14px regular, #A8A8A8, 2-line clamp
Timestamp: 12px gray, bottom-right
Selected: 2px left border #0066FF
```

### Rich Text Toolbar
```
Height: 48px
Background: #262626
Sticky top of document
Icon buttons: 32px squares, 16px icons
Unselected: #A8A8A8
Hover: #F5F5F5 icon, #333333 bg
Active: #0066FF icon, #333333 bg
Dividers: 1px #3E3E3E between groups
```

### Journal Entry Card
```
Same as Card + date badge top-left
Date badge: #8B5CF6 bg, 12px white
Mood indicators: 12px circular badges
Quote style: 4px left border #0066FF, italic 14px, 16px padding-left
```

### Collection Navigation
```
Icon: 16px folder, precedes label
Label: 14px regular
Hover: #333333 bg
Expanded: folder icon rotates 90°
Indentation: 16px per level
Drag handle: ⋮⋮ reveals on hover
Badge count: 12px, #0066FF, top-right
```

### Floating Action Button
```
Size: 56px circle
Background: #0066FF
Icon: white 24px
Position: bottom-right, 32px from edges
Hover: #0052CC, scale 1.08
Pressed: scale 0.95, shadow reduced
```

---

## Motion & Animation

```
Standard:       200ms ease-in-out
Modals:         300ms cubic-bezier(0.4, 0, 0.2, 1)
Sidebar:        300ms width transition
Button press:   50ms scale 0.95, release 200ms
Folder expand:  200ms rotation + height
Link underline: 150ms fade-in
Drag ghost:     50% opacity, 0ms cursor latency
Save complete:  600ms green checkmark, then fade
```

---

## Anti-Patterns

1. ❌ Persistent toolbars cluttering editor (content first)
2. ❌ Aggressive auto-save notifications (silent save = premium)
3. ❌ Forcing single-column on desktop
4. ❌ Low-contrast text in dark mode
5. ❌ Oversized header images
6. ❌ Animating every single interaction
7. ❌ Non-standard text selection behavior
8. ❌ Floating UI elements that obstruct reading
9. ❌ Inconsistent card spacing in list views
10. ❌ Auto-converting URLs to embeds without warning
11. ❌ No content recovery after deletion
12. ❌ Laggy text rendering (kills premium feel)
