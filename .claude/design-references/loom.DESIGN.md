# DESIGN.md - Loom Design System

## Visual Identity & Philosophy

Loom is built on an asynchronous-first, creator-empowering design philosophy. The visual language balances playfulness with professionalism — clean interfaces for recording and reviewing video, paired with approachable coaching and async messaging features.

**Core Values:**
- **Creator-Friendly**: Low friction recording, one-click sharing
- **Async-First**: Patterns supporting time-shifted communication
- **Playful Professionalism**: Approachable without being juvenile
- **Transparent Context**: Clear video metadata, viewer engagement signals

---

## Color Palette

| Element | Hex | Usage |
|---------|-----|-------|
| Primary Purple | `#625EFF` | CTAs, recording indicators, key interactions |
| Primary Hover | `#5142D0` | Darker purple on interaction |
| Secondary Orange | `#FF5630` | Coaching badges, status alerts |
| Accent Teal | `#00D9FF` | Mentions, viewer engagement badges |
| Background | `#FFFFFF` | Main canvas |
| Background Secondary | `#F5F5F7` | Cards, hover states |
| Text Primary | `#1F2937` | Headlines, primary copy |
| Text Secondary | `#6B7280` | Metadata, timestamps |
| Recording Red | `#EF4444` | Recording indicator (blinking) |
| Success | `#10B981` | Upload success, completion |
| Divider | `#E5E7EB` | Borders, separators |

---

## Typography

| Role | Font | Size | Weight |
|------|------|------|--------|
| Display | Inter | 40–48px | 700 |
| H1 | Inter | 32px | 700 |
| H2 | Inter | 24px | 600 |
| H3 | Inter | 20px | 600 |
| Body Large | Inter | 16px | 400 |
| Body | Inter | 14px | 400 |
| Small | Inter | 13px | 400 |
| Caption | Inter | 12px | 400 |
| Label Bold | Inter | 14px | 600 |
| Monospace | Menlo | 12px | 400 |

**Line height:** 1.6 (body) · 1.3 (headings)

---

## Spacing & Layout

- **Base unit:** 8px
- Mobile padding: 16px
- Desktop padding: 32px
- Sidebar width: 360px (collapses <1024px)
- Video player: responsive 16:9, max 100vw
- Max-width: 1400px

---

## Component Patterns

### Video Player
```
Aspect ratio: 16:9 (enforced)
Border-radius: 8px
Background: #000000
Controls: 40px overlay at bottom
Play button: 80px diameter, #625EFF, centered
Hover: +20% opacity on controls
Timestamp: bottom-left, 12px white on dark overlay
```

### Recording Indicator
```
Position: top-left corner overlay
Height: 48px pill
Background: #EF4444
Pulse: 800ms opacity cycle
Text: white 12px bold "Recording"
Padding: 12px 16px
Click to stop: dark red hover
```

### Async Comment Card
```
Border: 1px solid #E5E7EB
Border-radius: 8px
Padding: 16px
Avatar: 32px circle
Name: 14px semibold + timestamp 12px gray
Body: 14px regular, max 600px width
Coaching badge: #FF5630 small label
Reply: 12px text-only, bottom-right
```

### Engagement Timeline
```
Track: 4px, #E5E7EB
Watched: #625EFF fill
Interaction markers: 8px circles, #FF5630
Hover tooltip: 12px dark label, 200ms delay
```

### CTA Button
```
Background: #625EFF
Text: white 14px semibold
Padding: 10px 20px
Border-radius: 6px
Hover: #5142D0, -1px lift
Disabled: #EFEFEF bg, 50% opacity text
```

---

## Motion & Animation

```
Standard: 200ms ease-in-out
Modal slide-up: 300ms cubic-bezier(0.4, 0, 0.2, 1)
Button press: 100ms scale 0.98
Recording pulse: 800ms continuous opacity
Engagement badge pop: 300ms scale-bounce
Video scrubber: 0ms latency (instant)
```

---

## Anti-Patterns

1. ❌ Auto-playing audio in embedded players
2. ❌ Overwhelming coaching overlays on first record
3. ❌ Slow or laggy scrubber/seek (breaks video feel)
4. ❌ Multiple competing CTAs in recording interface
5. ❌ Broken aspect ratio on responsive layouts
6. ❌ Comment threads without visual threading
7. ❌ Unclear "public vs private" visibility toggles
8. ❌ No save prompt on recording interruption
9. ❌ Small timestamps or hard-to-read metadata
10. ❌ Notification fatigue for viewer engagement
