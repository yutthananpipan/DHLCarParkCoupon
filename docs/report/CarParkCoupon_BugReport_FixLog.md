# Car Park Coupon — Bug Fix Log

**Version:** 1.0.1 | **Date:** March 2026 | **Reference:** CarParkCoupon_BugReport.md

---

## Fix Summary

ทุก bug และ UX improvement ที่ระบุใน Bug Report ได้รับการแก้ไขเรียบร้อยแล้ว พร้อม E2E test coverage

| #      | Severity    | Issue                   | Status   | Fix Detail                                                             | Test Coverage                                  |
| ------ | ----------- | ----------------------- | -------- | ---------------------------------------------------------------------- | ---------------------------------------------- |
| BUG-01 | 🔴 Critical | setState during render  | ✅ Fixed | แยก countdown เป็น 2 `useEffect` — decrement + redirect trigger แยกกัน | `05-success.spec.ts`                           |
| BUG-02 | 🟠 High     | Mobile brand hidden     | ✅ Fixed | เพิ่ม compact red brand header `md:hidden`                             | `01-login.spec.ts`                             |
| BUG-03 | 🟠 High     | Number spinner arrows   | ✅ Fixed | เปลี่ยนเป็น `type="text" inputMode="numeric"` + filter + CSS           | `01-login.spec.ts`                             |
| BUG-04 | 🟠 High     | Whitespace bypass       | ✅ Fixed | เพิ่ม `.trim()` validation + trim ก่อน store                           | `03-detail-input.spec.ts`                      |
| BUG-05 | 🟠 High     | NEXT button turns black | ✅ Fixed | เปลี่ยน `hover:bg-black` → `hover:bg-[#b0040e]`                        | `03-detail-input.spec.ts`                      |
| BUG-06 | 🟠 High     | English HTML5 tooltips  | ✅ Fixed | ลบ `required`, เพิ่ม `noValidate` + custom validation ภาษาไทย          | `06-contact-modal.spec.ts`                     |
| BUG-07 | 🟡 Medium   | Error state persists    | ✅ Fixed | เปลี่ยน focus border เป็น `focus:border-gray-300` (แยกจาก error สีแดง) | `03-detail-input.spec.ts`                      |
| BUG-08 | 🟡 Medium   | Selected card lost      | ✅ Fixed | ส่ง `selectedReason` prop + conditional active styling                 | `02-reason-selection.spec.ts`                  |
| BUG-09 | 🔵 Low      | Cell 9 stuck hover      | ✅ Fixed | `focus:outline-none focus:bg-white` + `hover:bg-gray-50`               | `04-quantity.spec.ts`                          |
| BUG-10 | 🔵 Low      | Button text wraps       | ✅ Fixed | `whitespace-nowrap` + `text-sm md:text-base`                           | `04-quantity.spec.ts`                          |
| UX-01  | UX          | Progress indicator      | ✅ Done  | Step badges ("Step 01", "Step 02", "Step 03") มีอยู่แล้วในทุกหน้า      | `07-full-flow.spec.ts`                         |
| UX-02  | UX          | Countdown prominent     | ✅ Done  | Highlighted box + progress bar + ปุ่ม Pause หยุดนับถอยหลัง             | `05-success.spec.ts`                           |
| UX-03  | UX          | inputMode mobile        | ✅ Done  | เพิ่ม `inputMode`, `autoCapitalize` ทุก input/textarea                 | `01-login.spec.ts`, `06-contact-modal.spec.ts` |

---

## Files Modified

| File                                           | Bugs Addressed                             |
| ---------------------------------------------- | ------------------------------------------ |
| `src/components/screens/SuccessScreen.tsx`     | BUG-01, UX-02                              |
| `src/components/screens/LoginScreen.tsx`       | BUG-02, BUG-03, UX-03                      |
| `src/components/screens/DetailInputScreen.tsx` | BUG-04, BUG-05, BUG-07, UX-03              |
| `src/components/ContactModal.tsx`              | BUG-06, UX-03                              |
| `src/components/screens/ReasonScreen.tsx`      | BUG-08                                     |
| `src/components/screens/QuantityScreen.tsx`    | BUG-09, BUG-10                             |
| `src/App.tsx`                                  | BUG-08 (pass selectedReason prop)          |
| `src/index.css`                                | BUG-03 (spinner CSS), BUG-09 (focus reset) |

---

## How to Verify

```bash
# Run all E2E tests (Desktop + Mobile)
npm run test:e2e

# View HTML report
npm run test:e2e:report
```

---

_End of Fix Log — Car Park Coupon v1.0.1 | March 2026_
