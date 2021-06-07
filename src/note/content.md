## Color extraction methodology

### Figma

1. Import all defined [color styles][f-styles] exported from Figma using the [Export Styles to CSS Variables][fp-cssvars] plugin.
1. Import all fill and stroke colors detected by the [Style Lens][fp-sl] plugin. (Style Lens doesn't include an export function, so I just selected all text within the plugin panel window and pasted into a (pardon the term) [dump file][f-used], and then extracted all hex values from that dump. Messy, but workable.)
1. Discard any meta color styles not used in the UI (styles that include the prefix "meta"), and any styles not detected by Style Lens (i.e. unused colors), except for styles used in Android or iOS for any reason.
1. Combine remaining styles with used colors.

_Note: in Figma, we're considering the use of unnamed colors an anti-pattern, so unnamed colors are labeled '⚠️ unnamed color — needs fix'._

[f-styles]: https://codesandbox.io/s/github/tinymachine/qt-tahoe-color-compare/tree/main?file=/data/figma-color-styles.txt
[f-used]: https://codesandbox.io/s/github/tinymachine/qt-tahoe-color-compare/tree/main?file=/data/figma-colors-used.txt
[fp-cssvars]: https://www.figma.com/community/plugin/816737626312049592/Export-styles-to-CSS-variables
[fp-sl]: https://www.figma.com/community/plugin/856227067026087708/Style-Lens

### Android

1. Import [JSON file of Android color styles][android-json] (most recently supplied by David Willoughby on May 24).
1. Extract only the `light` theme hex values.
1. Remove alpha values (first two digits) from 8-digit hex values.
1. Remove colors used for debugging (e.g. `colorEF0000`).

[android-json]: https://codesandbox.io/s/github/tinymachine/qt-tahoe-color-compare/tree/main?file=/data/android-colors.json

### iOS

1. Import [JSON file of iOS color styles][ios-json] (most recently supplied by David Willoughby on May 20).
2. Extract only the `any` theme hex values.
3. Remove alpha values (last two digits) from 8-digit hex values.

[ios-json]: https://codesandbox.io/s/github/tinymachine/qt-tahoe-color-compare/tree/main?file=/data/ios-colors.json

—Mihira Jayasekera
