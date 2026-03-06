
The issue is on line 326. The mobile menu container has `bg-white/97` — the `/97` makes it 97% opacity which can appear slightly transparent, especially over certain page backgrounds. The fix is simply changing it to solid `bg-white`.

Also checking if the `index.css` has any CSS variables that might affect the background rendering for submenu areas.

The fix is a one-line change on line 326:
- Change `bg-white/97` → `bg-white`

This ensures the mobile menu panel has a fully opaque white background with no transparency bleed-through from the page content behind it.
