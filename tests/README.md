# E2E Testing — Car Park Coupon

## Overview

ระบบทดสอบ End-to-End สำหรับ Car Park Coupon App ใช้ **Playwright** ทดสอบทั้ง Desktop (1470×900) และ Mobile (390×844) viewports

## โครงสร้าง

```
tests/
├── e2e/
│   ├── helpers.ts                  # Shared helper functions (login, navigate, etc.)
│   ├── 01-login.spec.ts            # Login screen — BUG-02, BUG-03
│   ├── 02-reason-selection.spec.ts # Step 1: Reason cards — BUG-08
│   ├── 03-detail-input.spec.ts     # Step 2: Text/Dropdown input — BUG-04, BUG-05, BUG-07
│   ├── 04-quantity.spec.ts         # Step 3: Quantity grid — BUG-09, BUG-10
│   ├── 05-success.spec.ts          # Success screen — BUG-01, UX-02
│   ├── 06-contact-modal.spec.ts    # Contact modal — BUG-06
│   └── 07-full-flow.spec.ts        # Complete E2E flows (ทุก reason type)
├── reports/                        # Auto-generated (gitignored)
│   ├── html/                       # HTML report
│   └── artifacts/                  # Screenshots, videos on failure
└── README.md                       # ไฟล์นี้
```

## คำสั่ง

```bash
# รันทดสอบทั้งหมด (Desktop + Mobile)
npm run test:e2e

# รันเฉพาะ Desktop
npm run test:e2e:desktop

# รันเฉพาะ Mobile
npm run test:e2e:mobile

# เปิด Playwright UI (interactive mode)
npm run test:e2e:ui

# ดู HTML report
npm run test:e2e:report
```

## Bug Coverage Map

| Test File                     | Bugs Covered                  | Description                                                           |
| ----------------------------- | ----------------------------- | --------------------------------------------------------------------- |
| `01-login.spec.ts`            | BUG-02, BUG-03, UX-03         | Mobile brand panel, numeric input, inputMode                          |
| `02-reason-selection.spec.ts` | BUG-08                        | Selected reason highlight on back navigation                          |
| `03-detail-input.spec.ts`     | BUG-04, BUG-05, BUG-07, UX-03 | Whitespace validation, button color, error state, autoCapitalize      |
| `04-quantity.spec.ts`         | BUG-09, BUG-10                | Stuck hover, button text wrapping                                     |
| `05-success.spec.ts`          | BUG-01, UX-02                 | setState during render, countdown pause                               |
| `06-contact-modal.spec.ts`    | BUG-06, UX-03                 | Custom Thai validation, autoCapitalize                                |
| `07-full-flow.spec.ts`        | —                             | End-to-end ทุก flow (Visitor, Training, Outing, GMNC, Meeting, Other) |

## App Flow ที่ทดสอบ

```
Login → Welcome → Step 1 (Reason) → Step 2 (Detail) → Step 3 (Quantity) → Success
                                   ↳ GMNC → Confirm → Success
                                   ↳ Outing → Step 2 (Quantity) → Success
```

## หมายเหตุ

- Playwright จะ auto-start Vite dev server (`npm run dev:frontend`) ก่อนรันทดสอบ
- ถ้า dev server รันอยู่แล้ว จะ reuse server เดิม (ยกเว้นใน CI)
- Screenshots และ Videos จะถูกบันทึกเฉพาะเมื่อ test fail
- Reports อยู่ใน `tests/reports/html/` — เปิดด้วย `npm run test:e2e:report`
