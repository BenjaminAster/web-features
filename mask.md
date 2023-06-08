Note that CSS masking (with unprefixed mask-* properties) is part of Interop 2023 [1], which means that the 

Unprefixing the mask-* properties (and the mask shorthand) would mean:
 - Implementing the mask-mode property
 - Supporting SVG mask references inlined into HTML
 - Implementing the mask-composite property with the standardized values (add, subtract, intersect, exclude) instead of -webkit-mask-composite's non-standard values like 
 - Fixing various mask-related bugs

[1]: https://wpt.fyi/interop-2023

