## Plan: Apply New DHL Design System

I will update the entire application to match the modern DHL design provided, implementing the new color scheme (Yellow/Red/Black), typography, and component styling across all screens.

### Steps

1. Create `src/components/DHLLogo.tsx` to reuse the official SVG logo across the app.
2. Update `App.tsx` with global styles (selection colors, background) and layout structure.
3. Revamp `Header.tsx` with the new detailed yellow branding bar and logout button.
4. Update `LoadingOverlay.tsx` to the new centered white card with red spinner.
5. Transform `LoginScreen.tsx` to the split-screen design with the red "Smart Parking" visual.
6. Update `WelcomeScreen.tsx` to the card-based layout with the large "GET COUPON" action.
7. Refactor `ReasonScreen.tsx` to use the new icon grid with heavy drop shadows and hover effects.
8. Update `VisitorScreen.tsx` and `SuccessScreen.tsx` with the new yellow-bordered forms and clean typography.

### Further Considerations

1. **Types**: I will maintain strict typing with the existing `types/index.ts` while updating components.
2. **Icons**: I will ensure all `lucide-react` icons (User, LogOut, Car, etc.) are correctly imported in each split file.
