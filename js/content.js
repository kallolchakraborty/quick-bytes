const QUICK_BYTES = {
  site: {
    name: 'Quick Bytes',
    tagline: 'SAP RAP interview prep.',
    description: 'Last-minute cheat sheet: Determinations vs Validations in SAP RAP — the difference at a glance, interaction phases, minimal ABAP, rapid-fire Q&A.',
    url: 'https://kallolchakraborty.github.io/quick-bytes/',
    author: 'Kallol Chakraborty',
    authorUrl: 'https://www.linkedin.com/in/kallol-chakraborty-9728a699/',
  },
  stats: {
    guides: 1,
    phases: 1,
    platform: 'Engineering',
  },
  phases: [
    {
      id: 'sap-rap',
      title: 'SAP RAP',
      level: 'Interview',
      description: 'Read this right before the interview. Determinations vs Validations — the difference, when they run, and the classic questions.',
      guides: [
        {
          id: 'sap-rap-determinations-validations',
          title: 'Determinations vs Validations',
          description: 'Last-minute cheat sheet: the difference at a glance, interaction phases, minimal ABAP, and rapid-fire Q&A.',
          sections: [
            {
              id: 'cheat-sheet',
              title: 'The difference at a glance',
              content: `Determinations and validations are **automatic rules** on a RAP business object. The framework fires them — your code never calls them directly.

| | Determination | Validation |
|---|---|---|
| Job | Set / derive field values | Check values against business rules |
| Writes? | Yes — only its declared fields | No — read-only, never writes |
| Output | \`mapped\` (changes), \`reported\` | \`failed\` (blocks), \`reported\` (messages) |
| Trigger | \`on create\` / \`on modify\` / \`on save\` | \`on save\` (or on demand) |
| Phase | D | V |
| Example | Default Status = 'NEW', compute total | Reject end date before begin date |

**Golden rule:** determinations *compute*, validations *check*. A validation that \`MODIFY ENTITIES\` is a disqualifying error in an interview.`
            },
            {
              id: 'interaction-phases',
              title: 'When they run: AD → D → V → A → S',
              content: `Every create / update / delete runs through the same order:

1. **AD — Activation**: prepare the instance (create / enable).
2. **D — Determinations**: fill and derive values.
3. **V — Validations**: check the derived values.
4. **A — Actions**: explicit user operations.
5. **S — Save**: write to the database.

Three things to remember:

- **D runs before V**, so validations always see final, determined values — checking before defaults were set would produce wrong errors.
- A **validation error in V aborts** the operation: no actions run, nothing is saved.
- **ADR** = the three automatic phases; A and S only run if ADR passed.

**Numbering** runs first within D (so later logic has the key), and **one field belongs to one determination** per trigger.`
            },
            {
              id: 'minimal-abap',
              title: 'Minimal ABAP',
              content: `**Declare in the behavior definition (BDEF):**

\`\`\`abap
behavior for ZRAP_TRAVEL alias travel

  determination set_defaults on create { field Status; field BookingDate; }
  validation     check_dates    on save  { field BeginDate; field EndDate; }
\`\`\`

**Implement in the behavior pool** (method name = declaration + trigger):

\`\`\`abap
CLASS IMPLEMENTATION FOR BEHAVIOR OF zrap_travel.
  METHOD set_defaults_on_create.   " determination: writes fields
    READ ENTITIES OF zrap_travel IN LOCAL MODE
      ENTITY travel FIELDS ( TravelId )
      WITH CORRESPONDING #( keys ) RESULT DATA(lt).
    MODIFY ENTITIES OF zrap_travel IN LOCAL MODE
      ENTITY travel UPDATE FIELDS ( Status BookingDate )
      WITH VALUE #( FOR ls IN lt
        ( %tky = ls-%tky Status = 'NEW' BookingDate = sy-datum ) ).
  ENDMETHOD.

  METHOD check_dates_on_save.      " validation: read-only check
    READ ENTITIES OF zrap_travel IN LOCAL MODE
      ENTITY travel FIELDS ( BeginDate EndDate )
      WITH CORRESPONDING #( keys ) RESULT DATA(lt).
    LOOP AT lt INTO DATA(ls) WHERE BeginDate > EndDate.
      APPEND VALUE #( %tky = ls-%tky ) TO failed-travel.
      APPEND VALUE #( %tky = ls-%tky
        %msg = cl_abap_behv=>new_message_with_text(
          severity = if_abap_behv_message=>severity-error
          text     = 'End date must not be before begin date' ) )
        TO reported-travel.
    ENDLOOP.
  ENDMETHOD.
ENDCLASS.
\`\`\`

Rules: always **\`IN LOCAL MODE\`**, never \`SELECT\` (entity buffer, draft semantics, locks); process **all instances in one statement**; only touch fields in your declaration; \`%tky\` in \`reported\` is mandatory.`
            },
            {
              id: 'interview-qa',
              title: 'Rapid-fire Q&A',
              content: `**Q: What is the difference between a determination and a validation?**

**A:** Determinations compute and write field values; validations check values and never write. Neither is called by the caller — the framework fires both.

---

**Q: What is the execution order?**

**A:** \`AD → D → V → A → S\`. ADR run automatically; A and S run only if ADR passed.

---

**Q: Why do validations always see the determined values?**

**A:** Because V always runs after D.

---

**Q: Early vs late numbering?**

**A:** Early = key assigned first in D (the default — draft rows need an identity). Late = key assigned on save (per-customer sequences).

---

**Q: How does a validation block saving?**

**A:** Fill \`failed\` for each broken instance and \`reported\` with error severity and a mandatory \`%tky\`.

---

**Q: Can a determination run twice in one interaction?**

**A:** Yes — \`on modify\` fires per change. Keep it idempotent and cause-aware: gate on \`%c-<field>\` before recomputing.

---

**Q: Why \`IN LOCAL MODE\` and never \`SELECT\`?**

**A:** \`SELECT\` bypasses the entity buffer — stale data, broken draft semantics, and deadlocks against the instance lock.

---

**Q: Can two determinations set the same field?**

**A:** No — one field belongs to one determination per trigger. Validations may check any field.

---

**Q: Error severity vs warning?**

**A:** Error aborts the operation; warning lets the user continue.`
            },
          ],
        },
      ],
    },
  ],
};
