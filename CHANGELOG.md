## 6.0.1

This release requires Foundry VTT version 12.327

### Highlights

-   (TangledLion) Add new icon for Serum of Sex Shift

### System Improvements

-   (stwlam) Add support for drag/drop repositioning of regions
-   (stwlam) Add "axes" as a resistance type
-   (Supe) Add ability for GMs to gift items from merchants to players for free

### Bugfixes

-   (In3luki) Make pf2e specific prosemirror menu options available in journal sheets
-   (In3luki) Fix scene config terrain updates with blank inputs
-   (In3luki) Fix vision mode initialization before the canvas is ready
-   (In3luki) Update Token Config with changes from the latest core version
-   (In3luki) Show roll mode indicator for damage rolls
-   (Maple) Hide non-functional UI elements when editing non-stowing containers
-   (stwlam) Fix certain errors that sometimes occured with npc melee item traits
-   (stwlam) Fix UUIDs for older migrations and module art
-   (Supe) Fix errors with skill migrations from 6.0.0 beta 3.
-   (Supe) Fix Kingmaker settlements and update to Prosemirror
-   (Supe) Fix text issues in treat wounds and identify item
-   (Supe) Fix rendering of invested items within non-stowing containers

### Data Updates

-   (Ambrose M) Improve automation for Fire Shield
-   (Dire Weasel) Add campaign effect for Stoop
-   (Dire Weasel) Update automation for Howl of the Wild automation
-   (DocSchlock) Add max badge value to Multilating Bite
-   (DocSchlock) Update more skill ability scores to attribute modifiers for remaster
-   (DocSchlock) Fixes for Season of Ghosts major story npc
-   (Rigo) Add damage button to Thermal Nimbus
-   (Rigo) Fix the second Clan Lore skill
-   (Rigo) Move certain impulse junctions to feat description alterations
-   (SpartanCPA) Minor fixes to Trample and Corrupting Gaze
-   (stwlam) Fix malformed source uuids for wands held by certain NPCs
-   (Tikael) Add Howl of the Wild barbarian instincts
-   (Tikael) Fix automation of Awakened Animal and Swimming Animal heritage

### Under the Hood

-   (stwlam) Skip excluding creature traits for NPC strikes generated from rule elements
-   (Supe) Make the Strike rule's "ability" property into a resolvable

## 6.0.0 Beta 3

This release includes all data from system release 5.16.1 and requires Foundry VTT version 12.323. Several major under the hood changes have been made that would benefit from testing.

### System Improvements

-   (Abaddon) Localize physical item attach button label
-   (In3luki) Add support for scene environment types as well as scene environment region overrides
-   (Supe) Add button to view item specific roll options in the item rules tab

### Bugfixes

-   (In3luki) Fix grant item form erroring when resolvables fail
-   (MrVauxs) Add support for eidolon gang up flanking
-   (stwlam) Fix updating deity sanctification
-   (stwlam) Remove Z key token cycling now that a similar feature exists in FoundryVTT
-   (Supe) Allow class traits to be added to ability items
-   (Supe) Fix display of upgrade dice in roll inspector
-   (Supe) Fix resolution and updates of mergeable toggleable roll option dropdowns

### Data Updates

-   (Abaddon) Fix prerequites of certain feats
-   (Ambrose M) Fix and update Glass Shield and Fire Shield
-   (Dire Weasel) Add effect for Mind of Menace
-   (Dire Weasel) Update effect for Distracting Decoy and Shielding Wave
-   (Dire Weasel) Update Cry of Destruction and Chilling Darkness
-   (Dire Weasel) Fixes for Falling Portcullis and Rusted Door traps
-   (Rigo) Move impulse junction notes to feat description alterations
-   (rectulo) Fix malformed html in reveal hidden self
-   (stwlam) Fix source id for Padli's Wand of Magic Missile

### Under the Hood

-   (In3luki) Fix multiple errors caused by various uuid testing functions
-   (stwlam) Convert npc attacks and kit items to foundry data models
-   (Supe) Finish converting all short form skill abbreviations (ath) to skill slugs (athletics)
-   (Supe) Add roll options for item and feat action type and cost

## 6.0.0 Beta 2

This release requires Foundry VTT version 12.323

### System Improvements

-   (In3luki) Compact prosemirror to avoid wrapping in several locations
-   (In3luki) Style pf2e custom elements in prosemirror editor
-   (Supe) Use Prosemirror in character biographies, hazard sheet, npc sheet, and simple npc sheet

### Bugfixes

-   (Idle) Fix dropdown in Token Light RE form
-   (In3luki) Fix visibility of hidden, undetected, and unnoticed tokens
-   (In3luki) Fix melee weapons gaining a range
-   (In3luki) Fix new actors being assigned the wrong prototype token image
-   (In3luki) Fix rolling deterministic damage such as splash
-   (stwlam) Fix importing actors and items from module compendia

## 6.0.0 Beta 1

### New Features

-   (In3luki, stwlam, Supe) Add support for Foundry VTT version 12

### System Improvements

-   (In3luki) Switched text editor to prosemirror for item sheets
-   (Supe) Tweaked token config to better represent modifications from Rules Based Vision
-   (Supe) Reduced Rules Based Vision's brightness value to default foundry values for darkvision.

### Bugfixes

-   (Supe) Rerender token vision when global RBV setting is changed
