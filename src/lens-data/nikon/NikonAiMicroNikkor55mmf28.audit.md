# Nikon AI MICRO-NIKKOR 55mm f/2.8 — Source-state audit

Patent: US 4,260,223 A, Example 1 / Table 1, scaled by 0.55.

## 2026-09-26 — Source-state review

Source-state review outcome: partial. Both authored candidates reviewed: infinity
enabled; the reconstructed production half-life-size endpoint remains uncertified.
The source life-size configuration is not authored in this bare-lens model.

Visually checked local `patents/US_4260223_A.pdf`, PDF page 11, Table 1 and its
preceding first-embodiment discussion. All eleven source radii and internal thicknesses
match the retained model after scaling dimensions by 0.55; indices and Abbe numbers
are unchanged. Infinity d6=13.301 becomes 7.31555 mm. The source stop is 5.818
normalized units before surface 7: the retained split is 4.11565+3.19990 mm.
Physical iris radius and rims remain inferred. Existing rear image gap 42.456380475 mm
is calculated, not a printed source spacing.

The source explicitly defines object distance from the foremost lens surface and gives
a beta=-1 endpoint with normalized d0=164.194 and d6=29.773. That source geometry
is absent from the current file. It is not the existing focusT=1 state, whose total d6
is 8.774072105 mm rather than the source's scaled 16.37515 mm. The current endpoint
was solved from production 0.25 m object-to-film distance and 1:2 magnification, with
rear image gap 69.922557076 mm. This is inferred movement, not a source-backed
finite configuration, and is therefore excluded from the selector.

The offline audit finds a consistent physical source for the reconstructed endpoint:
148.653820819728 mm before the first surface, 250.000000000728 mm object-to-image,
beta=-0.499999999998. This is expected from its construction and does not certify the
mechanical gaps. A source-backed geometry matching that endpoint is the missing evidence;
passing ray checks or using the production minimum focus specification cannot replace it.

No source or optical values changed. The existing focus slider remains available, but
finite MTF remains unavailable. The patent's separate life-size row is not manufactured
through a new slider endpoint during this review. Catalog dispersion, inferred apertures
and ordinary MTF numerical/domain restrictions remain qualified.
