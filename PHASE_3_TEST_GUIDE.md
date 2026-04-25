# Phase 3: Interactive Features - Test Guide

**Component**: `LearningPathDetail.tsx`  
**Test Date**: 2026-04-25  
**Status**: Ready for Manual Testing

---

## Manual Testing Instructions

### Prerequisites
1. Start the dev server: `npm run dev`
2. Navigate to: `http://localhost:5173/learning-paths/1`
3. View the "Fondamentaux du Leadership" parcours

---

## Test Scenarios

### Test 1: Initial State Verification

**Objective**: Verify that the initial state loads correctly with proper unlock logic

**Expected Initial State** (Parcours ID 1):
- ✓ Step 1 (Introduction au Leadership): **Unlocked**, 3/3 lessons complete, **100% complete**
- ✓ Step 2 (Communication et Motivation): **Unlocked**, 1/3 lessons complete, 33% complete
- ✓ Step 3 (Développement et Culture): **LOCKED** 🔒, 0/3 lessons complete, 0% complete
- ✓ Final Project: **NOT YET AVAILABLE** (locked)
- ✓ Overall Progress: 4/9 lessons complete, 44%

**How to Verify**:
1. Look at the step cards
2. Step 1 should show: "Introduction au Leadership" with green badge "Unlocked" (visual indicator)
3. Step 2 should show: Toggle button enabled, clickable
4. Step 3 should show: "🔒 Complétez l'étape précédente pour déverrouiller" message
5. Step 3 toggle button should be **disabled** (grayed out)
6. Final Project tab should show a "Verrouillé" badge

**Pass Criteria**: ✅ All steps show correct unlock status, 4/9 progress displayed

---

### Test 2: Expand Step and View Lessons

**Objective**: Verify that step expansion works and lessons display correctly

**Steps**:
1. Click the "Afficher les leçons" toggle on Step 2
2. Verify the lessons list expands

**Expected Result**:
- Step 2 lessons should appear with smooth slideDown animation:
  - ▶ 1. Motivation et Engagement (50 min) - **✓ Checked**
  - ▶ 2. Communication Efficace (1h) - **Unchecked**
  - ▶ 3. Gestion des Conflits (55 min) - **Unchecked**

**Pass Criteria**: ✅ Lessons expand smoothly, checkmarks visible for completed lessons

---

### Test 3: Toggle Lesson Completion (Single Lesson)

**Objective**: Verify that toggling a lesson updates state and recalculates progress

**Action**:
1. In Step 2, click the checkbox for lesson 2-2 (Communication Efficace)

**Expected Immediate Changes**:
- ✓ Lesson 2-2 checkbox becomes checked
- ✓ Lesson 2-2 gets a checkmark (✓ icon)
- ✓ Step 2 progress updates: "2/3 complétées" (was "1/3")
- ✓ Step 2 progress bar fills to ~67% (was ~33%)
- ✓ Overall progress updates: "5/9 leçons complétées" (was "4/9")
- ✓ Overall progress bar fills to ~56% (was ~44%)

**Verification**:
- Check the progress counts in the header
- Check the progress bars for both step and overall progress
- **Step 3 should STILL BE LOCKED** (Step 2 not yet 100%)

**Pass Criteria**: ✅ Progress updates correctly, step 3 remains locked

---

### Test 4: Unlock Next Step by Completing Previous Step

**Objective**: Verify that completing a step unlocks the next step

**Action**:
1. In Step 2, click the checkbox for lesson 2-3 (Gestion des Conflits)

**Expected Immediate Changes**:
- ✓ Lesson 2-3 checkbox becomes checked
- ✓ Step 2 progress updates: "3/3 complétées"
- ✓ Step 2 progress bar fills to **100%**
- ✓ Step 2 completion status shows **"complété"** or visual indicator
- ✓ **Step 3 should NOW BE UNLOCKED** 🔓
- ✓ Step 3 toggle button becomes **enabled** (no longer grayed out)
- ✓ "🔒 Complétez..." message should disappear from Step 3
- ✓ Overall progress: "6/9 leçons complétées"

**Verification**:
1. Check Step 2 shows 100% progress
2. Check Step 3 toggle button is **clickable** (enabled)
3. Try clicking Step 3 toggle - it should expand (was previously disabled)

**Pass Criteria**: ✅ Step 3 unlocks immediately, toggle button enabled

---

### Test 5: Expand Unlocked Step and Complete Its Lessons

**Objective**: Verify that previously locked steps work after unlocking

**Action**:
1. Click "Afficher les leçons" on Step 3 (now unlocked)
2. The lessons should expand
3. Click checkboxes for all 3 lessons in Step 3

**Expected Behavior**:
- Step 3 lessons expand (if it wasn't already)
- All 3 lessons show checkboxes
- Each lesson can be toggled
- As each lesson completes:
  - Progress bar increases
  - Count updates: "1/3", "2/3", "3/3"
- When all 3 lessons complete:
  - Step 3 shows "3/3 complétées"
  - Overall progress reaches "9/9 leçons complétées"
  - Overall progress shows **100%**

**Pass Criteria**: ✅ All lessons can be toggled, step completion tracked

---

### Test 6: Final Project Unlock Trigger

**Objective**: Verify that final project unlocks when all steps are complete

**Prerequisites**: Complete Test 5 (all steps 100% complete)

**Expected Change**:
- Final Project tab badge changes from "Verrouillé" to available
- Clicking "Projet final" tab shows:
  - "Projet Final: Plan de Leadership" 🎯
  - Description text
  - Button changes from "🔒 Complétez toutes les étapes..." to **"Commencer le projet"**
  - Button is **enabled** (clickable)

**Verification**:
1. Check Final Project tab is no longer showing "Verrouillé"
2. Click to the Project tab
3. Verify the button is enabled and shows correct text

**Pass Criteria**: ✅ Final project unlocks, button enabled

---

### Test 7: Regression Test - Uncomplete a Lesson

**Objective**: Verify that uncompleting a lesson locks subsequent steps

**Prerequisites**: Steps 2 and 3 complete (from Test 5)

**Action**:
1. Collapse Step 3
2. Go back to Step 2
3. **Uncheck** lesson 2-3 (Gestion des Conflits)

**Expected Cascade**:
- ✓ Lesson 2-3 becomes unchecked
- ✓ Step 2 progress drops to "2/3 complétées"
- ✓ Step 2 progress bar drops to ~67%
- ✓ **Step 3 should IMMEDIATELY RE-LOCK** 🔒 (Step 2 no longer 100%)
- ✓ Step 3 toggle button becomes **disabled**
- ✓ "🔒 Complétez..." message reappears on Step 3
- ✓ Final Project locks again
- ✓ Overall progress drops to "8/9"

**Verification**:
1. Check Step 3 is now locked (toggle disabled)
2. Check Final Project tab shows "Verrouillé" again
3. Try clicking Step 3 toggle - should do nothing (disabled)

**Pass Criteria**: ✅ Unlocking cascade works both directions

---

### Test 8: Color Class Consistency

**Objective**: Verify that three-color rotation is applied correctly

**Expected Behavior**:
- Progress bars use the level color (débutant = primary/teal)
- Header background uses level color
- All visual indicators use consistent color theme

**Testing**:
1. Check header background color (should be primary/teal for débutant level)
2. Check all progress bars use same color
3. Verify colors are readable against backgrounds

**Pass Criteria**: ✅ Consistent color theming throughout

---

### Test 9: Tab Switching

**Objective**: Verify that tab switching works smoothly

**Action**:
1. Click "Étapes du parcours" tab (should be active)
2. Verify steps content displays
3. Click "Projet final" tab
4. Verify project content displays
5. Switch back to steps

**Expected Behavior**:
- Tabs highlight correctly (active tab underline)
- Content switches without losing state
- Expanded steps remain expanded when returning
- All progress counts remain accurate

**Pass Criteria**: ✅ Tab switching works, state preserved

---

### Test 10: Mobile Responsiveness (Optional)

**Objective**: Verify layout adapts to smaller screens

**Testing**:
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select mobile device (iPhone 12)
4. Verify:
   - Layout stacks vertically
   - Progress bars remain readable
   - Buttons are tap-friendly (large enough)
   - Text is readable
   - Tabs remain accessible

**Pass Criteria**: ✅ Mobile layout is usable

---

## Performance Testing

### Metrics to Check

1. **Click Response Time**: Lesson checkbox should toggle instantly (<100ms)
2. **Progress Recalculation**: Progress bar should update immediately
3. **Unlock Animation**: Step unlock should be visible/instantaneous
4. **No Console Errors**: DevTools console should be clean
5. **No Memory Leaks**: Check Memory profiler shows stable usage

### How to Test Performance

```javascript
// In browser console, before toggling a lesson:
performance.mark('before-toggle');

// Click a lesson checkbox

// After seeing update:
performance.mark('after-toggle');
performance.measure('toggle-time', 'before-toggle', 'after-toggle');
performance.getEntriesByName('toggle-time')[0].duration;
```

---

## Expected Test Results

| Test | Scenario | Expected | Status |
|------|----------|----------|--------|
| 1 | Initial State | Step 1 unlocked 100%, Step 2 unlocked 33%, Step 3 locked | ⏳ |
| 2 | Expand Step | Lessons list appears with animation | ⏳ |
| 3 | Toggle Single | Progress updates correctly | ⏳ |
| 4 | Unlock Next | Step 3 becomes enabled when Step 2 hits 100% | ⏳ |
| 5 | Complete All | All lessons can toggle, final project status changes | ⏳ |
| 6 | Project Unlock | Final project button enables when 100% complete | ⏳ |
| 7 | Regression | Unchecking a lesson re-locks subsequent steps | ⏳ |
| 8 | Colors | Consistent teal/primary color throughout | ⏳ |
| 9 | Tabs | Tab switching works, state preserved | ⏳ |
| 10 | Mobile | Layout adapts, remains usable on small screens | ⏳ |

---

## Troubleshooting

### If lessons don't toggle:
- Check that step is unlocked (toggle button enabled)
- Check browser console for errors
- Verify `toggleLessonCompletion` is being called

### If progress doesn't update:
- Check that state is updating (add console.log in toggleLessonCompletion)
- Verify useMemo is recalculating (check dependencies)
- Check that rendered parcours object has updated values

### If steps don't unlock:
- Verify previous step is actually 100% complete
- Check calculateStepUnlocked logic is correct
- Verify step completion calculation is correct

### If styles look wrong:
- Check that CSS variables are loaded (--tls-primary-500, etc.)
- Verify learning-paths.css is imported
- Check browser DevTools for CSS errors

---

## Sign-Off

**Ready for Testing**: ✅ Yes  
**Code Review**: ✅ Complete  
**TypeScript Compilation**: ✅ No errors in LearningPathDetail.tsx  
**Implementation Quality**: ✅ High (immutable updates, proper memoization)

**Next Phase**: Phase 4 - Complementary Content Integration

---

Generated: 2026-04-25  
Tested by: [Your Name]  
Date Tested: [Test Date]  
Result: [Pass/Fail with notes]
