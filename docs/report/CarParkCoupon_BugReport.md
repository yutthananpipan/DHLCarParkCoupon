# DHL Car Park Coupon — Bug Report & Development Handoff

**Version:** 1.0 | **Date:** March 2026 | **Prepared for:** Claude Code

---

## 1. Executive Summary

การตรวจสอบนี้ครอบคลุมการทดสอบ end-to-end บน desktop (1470×900) และ mobile (390×844 / iPhone-equivalent) สำหรับ app ที่รันอยู่ที่ `http://localhost:5173/`

> **หมายเหตุ:** ปัจจุบันเป็น mockup — ใช้ Employee ID อะไรก็ได้ในการ login

พบทั้งหมด **10 bugs** และ **3 UX improvements** โดยมี priority สูงสุดที่ mobile experience เพราะ user ส่วนใหญ่ใช้งานบนมือถือ

---

## 2. Bug Summary

| #      | Severity    | Area            | Issue                                                            |
| ------ | ----------- | --------------- | ---------------------------------------------------------------- |
| BUG-01 | 🔴 Critical | Success Screen  | React `setState` called during render — violates rendering rules |
| BUG-02 | 🟠 High     | Login (Mobile)  | Brand/logo panel hidden on mobile viewport                       |
| BUG-03 | 🟠 High     | Login           | Number input shows browser spinner arrows                        |
| BUG-04 | 🟠 High     | Step 2          | Whitespace-only input bypasses validation                        |
| BUG-05 | 🟠 High     | Step 2          | NEXT button turns black on validation error                      |
| BUG-06 | 🟠 High     | Step 2 + Modal  | HTML5 native English tooltips แทนที่จะเป็นภาษาไทย                |
| BUG-07 | 🟡 Medium   | Step 2          | Red border (error state) ค้างอยู่เมื่อ navigate กลับจาก Step 3   |
| BUG-08 | 🟡 Medium   | Step 1          | Selected reason card หายเมื่อ navigate กลับจาก Step 2            |
| BUG-09 | 🔵 Low      | Step 3          | ช่องตัวเลข '9' มี stuck CSS hover state (พื้นหลังเหลือง)         |
| BUG-10 | 🔵 Low      | Step 3 (Mobile) | ข้อความปุ่ม 'CONFIRM & PRINT' ตัดบรรทัดบน mobile                 |

---

## 3. Detailed Bug Reports

---

### BUG-01 — React `setState` Called During Render `[CRITICAL]`

**Area:** Success Screen
**File:** `src/App.tsx` ~line 148

**Description:**
`SuccessScreen` component เรียก `setState` ของ parent `App` โดยตรงในระหว่าง render phase ซึ่งละเมิด React rendering contract และทำให้เกิด console error ทุกครั้งที่ success screen โหลด

**Steps to Reproduce:**

1. Login ด้วย Employee ID ใดก็ได้
2. ทำ coupon form ครบ 3 steps
3. คลิก CONFIRM & PRINT
4. เปิด browser DevTools Console — จะเห็น error ทันที

**Actual Behavior:**

```
Cannot update a component (App) while rendering a different component (SuccessScreen).
To locate the bad setState() call inside SuccessScreen, follow the stack trace...
```

**Expected Behavior:**
ไม่มี console errors — state update จาก SuccessScreen ต้องไม่เกิดขึ้นระหว่าง render phase

**Recommended Fix:**

```tsx
// ❌ WRONG — setState called directly in render
const SuccessScreen = ({ onReset }) => {
  onReset(); // called during render — ILLEGAL
  return <div>...</div>;
};

// ✅ CORRECT — wrap in useEffect
const SuccessScreen = ({ startCountdown }) => {
  useEffect(() => {
    startCountdown(); // runs after mount, not during render
  }, []);
  return <div>...</div>;
};
```

---

### BUG-02 — Brand/Logo Panel Hidden on Mobile `[HIGH]`

**Area:** Login Page (Mobile)
**File:** Login component CSS / responsive breakpoint

**Description:**
บน mobile viewport (ต่ำกว่า ~768px) panel สีแดงด้านซ้ายที่มี DHL logo หายไปทั้งหมด หน้า login จึงไม่มี branding เลย ซึ่งดูไม่เป็นมืออาชีพ โดยเฉพาะเมื่อ user กลุ่มหลักใช้ mobile

**Steps to Reproduce:**

1. เปิด `http://localhost:5173/` บน mobile หรือ DevTools ที่ 390px
2. สังเกตว่าไม่มี panel สีแดงของ DHL

**Actual Behavior:** ไม่มี brand panel — เห็นแค่ login form สีขาว

**Expected Behavior:** DHL branding ปรากฏบน mobile ในรูปแบบที่เหมาะสม

**Recommended Fix:**

Option A (แนะนำ): บน mobile ให้แสดง compact top banner แทน side panel

```css
/* Hide side panel on mobile, show top banner instead */
@media (max-width: 767px) {
  .brand-panel {
    display: none;
  }
  .mobile-brand-header {
    display: flex;
  } /* red bar with DHL logo */
}
@media (min-width: 768px) {
  .mobile-brand-header {
    display: none;
  }
  .brand-panel {
    display: flex;
  }
}
```

Option B: ลด height ของ panel เป็น ~120–150px และวางไว้เหนือ login card บน mobile

> **UX Note:** เพราะ user ส่วนใหญ่ใช้ mobile การมี brand visibility สำคัญมากต่อความน่าเชื่อถือของระบบ

---

### BUG-03 — Number Input Shows Browser Spinner Arrows `[HIGH]`

**Area:** Login Page — Employee ID input
**File:** Login component — Employee ID input element

**Description:**
ช่อง Employee ID ใช้ `<input type="number">` ทำให้ browser แสดงปุ่ม up/down spinner ข้างใน field ซึ่งดูไม่สวยงามโดยเฉพาะบน mobile และยังเปิดโอกาสให้ user กด + / - โดยไม่ตั้งใจ

**Actual Behavior:** มี spinner arrows ด้านขวาของ input field

**Expected Behavior:** Input field สะอาด ไม่มี spinner controls

**Recommended Fix:**

```tsx
// ✅ Option A — Use text input with numeric keyboard (preferred)
<input
  type="text"
  inputMode="numeric"
  pattern="[0-9]*"
  placeholder="Enter your ID here"
  onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ''))}
/>

// ✅ Option B — Keep type="number" but hide spinner via CSS
```

```css
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type='number'] {
  appearance: textfield;
  -moz-appearance: textfield;
}
```

---

### BUG-04 — Whitespace-Only Input Bypasses Step 2 Validation `[HIGH]`

**Area:** Step 2 — Enter Vendor Name / Reason
**File:** Step 2 validation logic in `src/App.tsx`

**Description:**
การ validate ตรวจสอบแค่ว่า string ว่างหรือไม่ แต่ไม่ได้ trim whitespace ดังนั้นการพิมพ์ space เยอะๆ จะผ่าน validation ได้ และ coupon จะถูก generate โดยไม่มี vendor name

**Steps to Reproduce:**

1. Step 1: เลือก reason ใดก็ได้ (เช่น VISITORS)
2. Step 2: พิมพ์ space 3–5 ตัวในช่อง vendor name
3. คลิก NEXT
4. สังเกตว่า validation ผ่านและไปถึง Step 3

**Actual Behavior:** Space-only input ถือว่า valid — coupon ถูก print โดยไม่มี vendor name

**Expected Behavior:** Space-only input ต้องล้มเหลว validation

**Recommended Fix:**

```tsx
// ❌ WRONG
if (!inputValue) showError();

// ✅ CORRECT
if (!inputValue.trim()) {
  showError();
  return;
}
// Also trim before storing:
setVendorName(inputValue.trim());
```

---

### BUG-05 — NEXT Button Turns Black on Validation Error `[HIGH]`

**Area:** Step 2 — Validation Error State
**File:** Step 2 component — NEXT button CSS / conditional class

**Description:**
เมื่อ submit Step 2 โดยที่ช่องว่าง ปุ่ม NEXT จะเปลี่ยนเป็นสีดำ ซึ่งดูเหมือนปุ่ม disabled ทำให้ user อาจคิดว่าปุ่มไม่ทำงานแล้ว

**Actual Behavior:** ปุ่ม NEXT กลายเป็นสีดำ

**Expected Behavior:** ปุ่มควรคงสีแดงไว้ตลอด และแสดง error message ใต้ช่องแทน

**Recommended Fix:**

```tsx
// ❌ WRONG — changing button color to signal error
<button className={hasError ? 'btn btn--error-black' : 'btn btn--red'}>
  NEXT
</button>

// ✅ CORRECT — keep button red, show error text below input
<input className={hasError ? 'input input--error' : 'input'} />
{hasError && (
  <p className="error-text">กรุณากรอกข้อมูลก่อนดำเนินการต่อ</p>
)}
<button className="btn btn--red">NEXT</button>
```

---

### BUG-06 — HTML5 Native English Tooltips (Should Be Thai) `[HIGH]`

**Area:** Step 2 Input + แจ้งแก้ไขข้อมูล Modal
**File:** Step 2 input + textarea fields ใน modal (ใช้ `required` attribute)

**Description:**
Form fields ที่ใช้ HTML5 `required` attribute จะแสดง browser tooltip ภาษาอังกฤษว่า _"Please fill out this field."_ แต่ UI ทั้งหมดเป็นภาษาไทย ทำให้ inconsistent มาก

**Actual Behavior:** `"Please fill out this field."` (ภาษาอังกฤษ)

**Expected Behavior:** Error message ภาษาไทยแสดงใต้ช่อง input

**Recommended Fix:**

```tsx
// ❌ WRONG — using HTML5 required (browser controls the error message)
<input required placeholder="..." />

// ✅ CORRECT — custom validation with Thai message
const [error, setError] = useState('');

const handleSubmit = () => {
  if (!value.trim()) {
    setError('กรุณากรอกข้อมูลก่อนดำเนินการต่อ');
    return;
  }
  setError('');
  goToNextStep();
};

return (
  <>
    <input value={value} onChange={...} className={error ? 'input--error' : ''} />
    {error && <p className="error-msg">{error}</p>}
  </>
);
```

> **UX Note (Modal):** textarea ใน modal แสดง border สีเหลือง/ส้มตอน error — ควรเปลี่ยนเป็นสีแดง (`#C0392B`) ให้ consistent กับส่วนอื่นของ app

---

### BUG-07 — Error State Persists When Navigating Back to Step 2 `[MEDIUM]`

**Area:** Step 2 — Back Navigation from Step 3
**File:** Step navigation logic / state management

**Description:**
ถ้า user ไปถึง Step 3 แล้วกดย้อนกลับมา Step 2 จะเห็น input field มี red border ทั้งๆ ที่ field มีข้อมูลถูกต้องอยู่แล้ว เพราะ error state ไม่ได้ถูก reset เมื่อเปลี่ยน step

**Steps to Reproduce:**

1. ทำ Step 1 และ Step 2 ให้ครบ (กรอก vendor name)
2. ไปถึง Step 3
3. กดปุ่ม back กลับ Step 2
4. สังเกต red border บน input field

**Actual Behavior:** Input field มี red border แม้ข้อมูลจะถูกต้อง

**Expected Behavior:** ไม่มี red border เมื่อ navigate กลับ

**Recommended Fix:**

```tsx
const goBack = () => {
  setInputError(false); // clear error state on navigation
  setStep(currentStep - 1);
};
```

---

### BUG-08 — Selected Reason Card Loses Highlight When Returning to Step 1 `[MEDIUM]`

**Area:** Step 1 — Back Navigation from Step 2
**File:** Step 1 reason card component

**Description:**
หลังจากเลือก reason card บน Step 1 แล้วไป Step 2 เมื่อกดย้อนกลับ Step 1 จะไม่มี card ไหนถูก highlight อยู่เลย ทั้งที่ selection ควรจะยังจำอยู่

**Steps to Reproduce:**

1. Step 1: คลิก reason card ใดก็ได้ (เช่น VISITORS) — card highlight สีแดง
2. คลิก NEXT ไป Step 2
3. กดย้อนกลับ Step 1
4. สังเกตว่าไม่มี card ไหน highlight

**Actual Behavior:** ไม่มี card highlight — selection หายไป

**Expected Behavior:** Card ที่เคยเลือกไว้ยังคง highlight อยู่

**Recommended Fix:**

```tsx
// Ensure selectedReason state lives in parent (App) and persists across steps

// In Step 1 component:
const ReasonCard = ({ value, label, selectedReason, onSelect }) => (
  <div
    className={`card ${selectedReason === value ? 'card--active' : ''}`}
    onClick={() => onSelect(value)}
  >
    {label}
  </div>
);
```

---

### BUG-09 — Number '9' Cell Has Stuck CSS Hover State `[LOW]`

**Area:** Step 3 — Quantity Selector Grid
**File:** Step 3 quantity grid CSS

**Description:**
ช่องตัวเลข '9' ในตาราง quantity แสดงพื้นหลังสีเหลืองอ่อนๆ ทั้งๆ ที่ไม่ได้ถูก select ช่องอื่นๆ ทั้งหมดมีพื้นหลังสีขาวปกติ เป็น `:hover` หรือ `:focus` state ที่ค้างอยู่

**Actual Behavior:** ช่อง '9' มีพื้นหลังสีเหลือง inconsistent

**Expected Behavior:** ทุก cell ที่ไม่ได้ select มีพื้นหลังขาวเท่ากัน

**Recommended Fix:**

```css
.quantity-cell {
  background-color: #ffffff;
  transition: background-color 0.15s ease;
}

.quantity-cell:hover {
  background-color: #f5f5f5;
}

.quantity-cell:focus {
  outline: none;
  background-color: #ffffff; /* reset on focus, not yellow */
}

.quantity-cell--selected {
  background-color: #d40511; /* DHL red */
  color: #ffffff;
}
```

---

### BUG-10 — 'CONFIRM & PRINT' Button Text Wraps on Mobile `[LOW]`

**Area:** Step 3 (Mobile) — Confirm Button
**File:** Step 3 component — CONFIRM & PRINT button CSS

**Description:**
บน mobile (390px) ข้อความในปุ่ม CONFIRM & PRINT ตัดขึ้นบรรทัดใหม่ ทำให้ปุ่มสูงเกินไปและดูไม่เรียบร้อย

**Actual Behavior:** ข้อความตัดเป็น 2 บรรทัด: `CONFIRM &` / `PRINT`

**Expected Behavior:** ข้อความอยู่บรรทัดเดียว

**Recommended Fix:**

```css
/* Option A — prevent wrapping */
.confirm-btn {
  white-space: nowrap;
}

/* Option B — smaller font on mobile */
@media (max-width: 480px) {
  .confirm-btn {
    font-size: 14px;
    padding: 12px 16px;
  }
}
```

หรือใช้ label ภาษาไทยที่สั้นกว่าบน mobile: `"ยืนยัน & พิมพ์"`

---

## 4. UX Improvement Recommendations

### UX-01 — เพิ่ม Progress Indicator สำหรับ Multi-Step Form

ปัจจุบันไม่มีตัวบอกว่า user อยู่ที่ step ไหน และเหลืออีกกี่ step — เพิ่ม drop-off rate โดยเฉพาะบน mobile

**Recommended:**

```
● ขั้นตอนที่ 1  ○ ขั้นตอนที่ 2  ○ ขั้นตอนที่ 3
```

หรือ text: `"ขั้นตอนที่ 1 จาก 3"` — active step สีแดง (`#D40511`), completed step สีเทา

---

### UX-02 — ทำให้ Auto-Redirect Countdown เด่นชัดขึ้น

ข้อความ countdown บน Success screen (`"กลับหน้าหลักอัตโนมัติใน X วินาที"`) ตอนนี้เล็กมาก user อาจตกใจเมื่อหน้าจอเปลี่ยนโดยไม่รู้ตัว

**Recommended:**

- ขยาย font size และใส่ใน highlighted box
- เพิ่มปุ่ม "ยกเลิกการนับถอยหลัง" ให้ user หยุด timer ได้
- พิจารณาเพิ่ม countdown เป็น 10–15 วินาที เพื่อให้ user มีเวลาอ่านข้อมูล coupon

---

### UX-03 — Keyboard-Friendly Input Modes สำหรับ Mobile

```tsx
// Employee ID — numeric keyboard, no letters
<input type="text" inputMode="numeric" pattern="[0-9]*" />

// Vendor name — auto-capitalize first letter of each word
<input type="text" inputMode="text" autoCapitalize="words" />

// Reason textarea in modal
<textarea inputMode="text" autoCapitalize="sentences" />
```

---

## 5. Technical Context

**Stack:** React + TypeScript (Vite), entry point `src/App.tsx`, dev server `http://localhost:5173/`

**App Flow:**

```
Login → Step 1 (Select Reason) → Step 2 (Enter Vendor/Reason) → Step 3 (Select Quantity) → Success Screen
```

**State Notes:**

- `App.tsx` เก็บ global state: selected reason, vendor name, quantity, step index, employee info
- `SuccessScreen` render แบบ conditional เมื่อ form complete
- Modal "แจ้งแก้ไขข้อมูล" เข้าถึงได้จากหลาย screen
- วันที่บน Success screen แสดงเป็นรูปแบบ พ.ศ. — **ห้ามเปลี่ยน locale นี้**
- Auto-redirect timer อยู่ใน `SuccessScreen` — ตรงนี้คือที่เกิด BUG-01

**Console Noise (ไม่ใช่ bug ของ app):**

```
A listener indicated an asynchronous response by returning true,
but the message channel closed before a response was received
```

error 4 บรรทัดนี้มาจาก browser extension ไม่ใช่ app — ไม่ต้องแก้

---

## 6. Recommended Fix Priority Order

| ลำดับ | ID     | Severity | งาน                                                        |
| ----- | ------ | -------- | ---------------------------------------------------------- |
| 1st   | BUG-01 | Critical | Fix React `setState`-during-render ใน SuccessScreen        |
| 2nd   | BUG-04 | High     | เพิ่ม `.trim()` validation บน Step 2                       |
| 3rd   | BUG-06 | High     | เปลี่ยน HTML5 tooltip เป็น custom Thai error message       |
| 4th   | BUG-05 | High     | แก้ NEXT button อย่าให้เปลี่ยนเป็นดำตอน error              |
| 5th   | BUG-02 | High     | เพิ่ม mobile brand panel / top header bar                  |
| 6th   | BUG-03 | High     | ซ่อน spinner arrows บน Employee ID input                   |
| 7th   | BUG-07 | Medium   | Clear error state เมื่อ navigate กลับ Step 2               |
| 8th   | BUG-08 | Medium   | Restore selected card highlight เมื่อ navigate กลับ Step 1 |
| 9th   | UX-01  | UX       | เพิ่ม multi-step progress indicator                        |
| 10th  | BUG-09 | Low      | แก้ stuck CSS hover บน quantity cell '9'                   |
| 11th  | BUG-10 | Low      | แก้ button text wrapping บน mobile (CONFIRM & PRINT)       |
| 12th  | UX-02  | UX       | ปรับปรุง auto-redirect countdown ให้ชัดเจนขึ้น             |
| 13th  | UX-03  | UX       | เพิ่ม `inputMode` attributes สำหรับ mobile keyboard        |

---

_End of Report — DHL Car Park Coupon Bug Audit | March 2026_
