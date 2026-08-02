const QUICK_BYTES = {
  site: {
    name: 'Quick Bytes',
    tagline: 'SAP RAP interview prep.',
    description: 'Determinations and Validations in SAP RAP — compact cheatsheet with ABAP code, made to clear FAANG interviews.',
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
      level: 'Advanced',
      description: 'Determinations & Validations — the automatic behavior-model methods. High-yield, interview-ready.',
      guides: [
        {
          id: 'sap-rap-determinations-validations',
          title: 'Determinations & Validations in RAP',
          description: 'Interview cheatsheet: definitions, execution order, ABAP, and common FAANG questions.',
          sections: [
            {
              id: 'cheatsheet',
              title: 'Cheatsheet',
              content: `**Determination** = framework auto-*sets* field values. **Validation** = framework auto-*checks* values and reports \`failed\` / \`reported\`. Neither is ever called by the caller — the framework fires them in interaction phases.

| | Determination | Validation |
|---|---|---|
| Job | Set / derive fields | Check fields |
| Writes? | Yes (declared fields only) | No (read-only) |
| Reports | \`mapped\` | \`failed\` + \`reported\` |
| Triggers | \`on create\` / \`on modify\` / \`on save\` | \`on save\` / on demand |
| Phase | D | V |
| Typical use | Numbering, defaults, totals | Consistency rules |

**BDEF → behavior pool:**

\`\`\`abap
behavior for ZRAP_TRAVEL alias travel
  persistent table zrap_travel
  draft table zrap_travel_d
  etag master last_changed_at

  determination numbering on create { field TravelId; }
  determination set_defaults on create { field Status; field BookingDate; }
  determination compute_total on modify { field TotalPrice; }

  validation check_dates on save { field BeginDate; field EndDate; }
\`\`\`

Implemented in \`CLASS IMPLEMENTATION FOR BEHAVIOR OF zrap_travel\`. Method name = \`<determination>_<trigger>\`, snake_case (e.g. \`set_defaults_on_create\`).`
            },
            {
              id: 'execution-order',
              title: 'Execution Order',
              content: `**Interaction phases (in order):**

\`AD → D → V → A → S\`

1. **AD** — Activation determinations (on create/enable)
2. **D** — Determinations (derive values)
3. **V** — Validations (check values)
4. **A** — Actions (explicit calls)
5. **S** — Save sequence: \`finalize → check_before_save → save (draft activation) → cleanup\`

**Rules that get asked:**

- **ADR** = the 3 *automatic* phases. Actions and Save only run if ADR passed.
- Validation error (\`failed\`) aborts the whole interaction — no actions, no save.
- **Early numbering** (\`numbering on create\`) runs *first* in D, so later create logic sees the key.
- Within D, methods run in BDEF declaration order.
- **One field = at most one determination per trigger.** Two determinations on the same field/trigger fail the build.
- \`on modify\` fires per field change; its **field list** controls which changes trigger it.`
            },
            {
              id: 'determinations-in-abap',
              title: 'Determinations in ABAP',
              content: `**Defaults on create:**

\`\`\`abap
METHOD set_defaults_on_create.
  READ ENTITIES OF zrap_travel IN LOCAL MODE
    ENTITY travel
    FIELDS ( TravelId )
    WITH CORRESPONDING #( keys ) RESULT DATA(lt_travels).

  MODIFY ENTITIES OF zrap_travel IN LOCAL MODE
    ENTITY travel
    UPDATE FIELDS ( Status BookingDate )
    WITH VALUE #( FOR ls IN lt_travels
                  ( %tky = ls-%tky Status = 'NEW' BookingDate = sy-datum ) ).
ENDMETHOD.
\`\`\`

**Numbering (early key assignment):**

\`\`\`abap
METHOD numbering_on_create.
  READ ENTITIES OF zrap_travel IN LOCAL MODE
    ENTITY travel FIELDS ( TravelId )
    WITH CORRESPONDING #( keys ) RESULT DATA(lt_travels).

  LOOP AT lt_travels INTO DATA(ls).
    MODIFY ENTITIES OF zrap_travel IN LOCAL MODE
      ENTITY travel UPDATE FIELDS ( TravelId )
      WITH VALUE #( ( %tky = ls-%tky TravelId = zcl_numbering=>next( ) ) ).
  ENDLOOP.
ENDMETHOD.
\`\`\`

**Golden rules:**

- Use **\`READ ENTITIES / MODIFY ENTITIES … IN LOCAL MODE\`** — never \`SELECT\` (bypasses the entity buffer, breaks draft semantics).
- **\`%c\` cause param** — for \`on modify\`, \`IF %c-Currency IS NOT INITIAL\` tells you which field triggered it. Skip work when irrelevant.
- Process **all keys in one statement** — never loop with per-row reads.
- Write only fields in your BDEF field list.`
            },
            {
              id: 'validations-in-abap',
              title: 'Validations in ABAP',
              content: `**Check + report:**

\`\`\`abap
METHOD check_dates_on_save.
  READ ENTITIES OF zrap_travel IN LOCAL MODE
    ENTITY travel FIELDS ( BeginDate EndDate )
    WITH CORRESPONDING #( keys ) RESULT DATA(lt_travels).

  LOOP AT lt_travels INTO DATA(ls)
       WHERE BeginDate > EndDate.
    APPEND VALUE #( %tky = ls-%tky ) TO failed-travel.
    APPEND VALUE #( %tky       = ls-%tky
                    %state_area = 'CHECK_DATES'
                    %msg = cl_abap_behv=>new_message_with_text(
                      severity = if_abap_behv_message=>severity-error
                      text     = 'Begin date must be <= end date' ) )
           TO reported-travel.
  ENDLOOP.
ENDMETHOD.
\`\`\`

**Must-knows:**

- **\`%tky\` in \`reported\` is mandatory** — a message without a key cannot attach to the UI row.
- \`failed\` + severity-error = interaction aborts. Warning severity = user can continue.
- **\`%state_area\`** groups messages so \`REPORTED\` cleanup works.
- **On-demand trigger** from an action (validation cause):
\`\`\`abap
MODIFY ENTITIES OF zrap_travel IN LOCAL MODE
  ENTITY travel UPDATE FIELDS ( BeginDate )
  WITH VALUE #( ( %tky = keys[ 1 ]-%tky
                  %control-BeginDate = if_abap_behv=>mk-on ) ).
\`\`\`
- **Draft:** \`on save\` validations run at save/activation — the gate before an invalid draft is activated.`
            },
            {
              id: 'interview-qa',
              title: 'Interview Q&A',
              content: `**Q: What is the difference between a determination and a validation?**

**A:** Both are automatic behavior-implementation methods — the framework fires them inside interaction phases; the caller never invokes them directly.

| | Determination | Validation |
|---|---|---|
| Purpose | Set / derive field values | Check values against business rules |
| Writes | Yes — fields in its BDEF field list | No — read-only |
| Output | \`mapped\`, \`reported\` | \`failed\`, \`reported\` |
| Trigger | \`on create\` / \`on modify\` / \`on save\` | \`on save\` (or on demand) |
| Phase | D | V |

**Interviewer's angle:** the answer must be "determinations compute, validations check, neither is called explicitly, and validations never modify data." Saying a validation can \`MODIFY ENTITIES\` is a disqualifying error.

---

**Q: What is the execution order of the interaction phases?**

**A:** \`AD → D → V → A → S\`, evaluated per CUD operation:

1. **AD — Activation determinations** — fire on create/enable to prepare the instance before D.
2. **D — Determinations** — derive values: \`numbering on create\` runs first, then remaining create determinations, then \`on modify\` determinations, in BDEF declaration order.
3. **V — Validations** — check the **derived** state. All determinations complete before any validation runs.
4. **A — Actions** — explicit operations.
5. **S — Save sequence** — \`finalize → check_before_save → save (draft activation) → cleanup\`.

Consequences:

- A validation error in V aborts the interaction: no actions run, nothing is saved.
- Because V runs after D, validations always see determined values — you validate dates/totals *after* the determination has set them.
- **ADR** (Activation, Determination, Validation) is the mnemonic for the three automatic phases; Actions and Save only run if ADR passed.

---

**Q: Early vs late numbering — when do you use which?**

**A:** Both assign keys. **Early numbering** is \`determination numbering on create { field TravelId; }\` and runs *first* in the D phase, so every subsequent create determination and validation sees the assigned key.

- **Early (default):** keys are available immediately — for the draft row, for a parent referencing a child (or vice versa) in a composition, and for UIs that must display the ID before save. Standard choice for most business objects.
- **Late** (\`determination numbering on save\`): assign the key only when data is final — e.g. per-customer sequences or keys derived from totals/status computed during the interaction. Earlier logic must work without a key, so this is the exception.

**Interviewer's angle:** mention that keys typically come from a **number range object** and that early numbering is the norm because draft instances need an identity too.

---

**Q: How do you trigger a validation before an action completes?**

**A:** Validations fire automatically only in their V phase (or on their declared trigger). To force a check earlier — e.g. inside an action, before you set a status — use the **validation cause**:

\`\`\`abap
METHOD confirm_booking.
  MODIFY ENTITIES OF zrap_travel IN LOCAL MODE
    ENTITY travel
    UPDATE FIELDS ( BeginDate EndDate )
    WITH VALUE #( ( %tky = keys[ 1 ]-%tky
                    %control-BeginDate = if_abap_behv=>mk-on
                    %control-EndDate   = if_abap_behv=>mk-on ) )
    REPORTED DATA(ls_reported).
  " forward ls_reported into the action's reported-travel
ENDMETHOD.
\`\`\`

Only the validations whose fields are marked \`if_abap_behv=>mk-on\` run, and their \`reported\` must be forwarded from the action's result. This is the standard "validate before I change state" pattern.

**Interviewer's angle:** they want to see that validations are *cause-driven and conditional*, not "called" like a regular method.

---

**Q: How do you surface an error to the UI and abort the operation?**

**A:** Fill both output parameters:

- **\`failed\`** — one entry per failing instance (\`%tky\`). Marks the instance as failed; the framework aborts the operation.
- **\`reported\`** — the messages, each with mandatory \`%tky\`, plus \`%msg\` and \`%state_area\`:

\`\`\`abap
APPEND VALUE #( %tky = ls-%tky ) TO failed-travel.
APPEND VALUE #( %tky       = ls-%tky
                %state_area = 'CHECK_DATES'
                %msg = cl_abap_behv=>new_message(
                  id       = 'ZRAP_TRAVEL'
                  number   = '002'
                  severity = if_abap_behv_message=>severity-error
                  with     = ls-TravelId ) ) TO reported-travel.
\`\`\`

- Severity **error** → operation aborts; **warning** → the user may continue.
- \`%state_area\` groups messages so \`CLEAR REPORTED\` can remove them later without losing unrelated messages.
- Use a message class (\`new_message\`) for localization; \`new_message_with_text\` is prototype-only.
- For field-level feedback, also report \`%element-<field>\` to highlight the offending UI field.

**Interviewer's angle:** a missing \`%tky\` in \`reported\` means the message cannot attach to a row — a classic bug candidates miss.

---

**Q: Can a determination run more than once in an interaction? Is that a problem?**

**A:** Yes. \`on modify\` determinations fire on each relevant field change — two field updates in one interaction can trigger the same determination twice. Requirements:

- **Idempotency:** re-running must be harmless (setting a value twice changes nothing).
- **Cause-awareness:** gate on \`%c\` — \`IF %c-Currency IS NOT INITIAL.\` to skip recomputation when the triggering field was not touched.
- The framework prevents infinite recursion within the same phase, but chained triggers across determinations are possible — keep the D phase side-effect free.

**Interviewer's angle:** "make determinations idempotent and cause-aware" is the expected answer; weaker candidates assume one call per interaction.

---

**Q: Why must determinations/validations use READ/MODIFY ENTITIES IN LOCAL MODE instead of SELECT?**

**A:** The framework keeps a **session entity buffer** for the business object. \`SELECT\` bypasses it and:

- reads **stale** data (unpersisted in-session changes are invisible),
- breaks **draft semantics** (unactivated changes live in the draft buffer, not the DB),
- can **deadlock** against the RAP enqueue lock held for the instance,
- ignores the \`FIELDS ( … )\` optimization and loads data the framework already holds.

\`READ ENTITIES … IN LOCAL MODE\` reads the buffered state, respects draft behavior, and participates in the framework's authorization and locking model. Only \`save\` methods may touch the database directly.

**Interviewer's angle:** the #1 code-review catch. A SELECT inside a behavior method is an automatic fail.

---

**Q: Can two determinations maintain the same field?**

**A:** No — a field may appear in the field list of **at most one determination per trigger**; the build fails otherwise. This enforces unambiguous write ownership. Validations, by contrast, may check any field, including ones a determination maintains.

**Interviewer's angle:** ownership = single responsibility. If you need two writers for one field, your responsibility split is wrong.

---

**Q: How do drafts interact with determinations and validations?**

**A:** A draft-enabled business object stores unactivated changes in a draft table. Lifecycle: create draft → modify → validate → **activate** (writes the active table, optionally via an upgrade step).

- \`on create\` / \`on modify\` determinations and validations run against the **draft** instance, not the active row.
- \`on save\` validations are the gate at **activation** — an invalid draft can exist but cannot be activated.
- **Activation determinations** (AD phase) run on activate/enable, e.g. to set values only meaningful for the active instance.

**Interviewer's angle:** the two depth signals are "validations on save = activation gate" and "draft rows need early numbering to be identifiable."

---

**Q: What happens to the transaction when a validation fails?**

**A:** The interaction for the failing instance **aborts at that phase**:

- No actions and no save run for that instance; the database is untouched.
- The instance keeps its current state — draft changes remain, the user can fix the data and retry.
- The client receives the \`reported\` messages; the UI marks the row/field as failed.
- Sibling instances in the same call are unaffected if they passed their checks.

**Interviewer's angle:** failure is *phase-scoped* — it does not roll back the whole user session. The draft stays editable, which is exactly why "validate on save" works for interactive UIs.

---

**Recap:** process all keys in one statement · read only needed fields · keep determinations idempotent + cause-aware · localize messages via message class · never write from a validation · never SELECT from the DB.`
            },
          ],
        },
      ],
    },
  ],
};
