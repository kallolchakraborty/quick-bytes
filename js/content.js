const QUICK_BYTES = {
  site: {
    name: 'Quick Bytes',
    tagline: 'SAP RAP interview prep.',
    description: 'Determinations and Validations in SAP RAP — beginner-friendly intro with ABAP code, plus interview prep.',
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
      level: 'Beginner',
      description: 'Determinations & Validations explained from scratch — no prior RAP knowledge needed. Code examples and interview prep included.',
      guides: [
        {
          id: 'sap-rap-determinations-validations',
          title: 'Determinations & Validations in RAP',
          description: 'A beginner-friendly walkthrough: what RAP is, what determinations and validations do, and how to write them — plus interview Q&A.',
          sections: [
            {
              id: 'what-is-rap',
              title: 'What is RAP?',
              content: `**RAP** (ABAP RESTful Application Programming Model) is SAP's modern way to build business applications in ABAP. Think of it as a production line with three parts:

1. **Data model (CDS views)** — defines what data the app stores (like a database schema).
2. **Behavior definition (BDEF, a \`.behavior\` file)** — declares what the app can *do* with the data: create, update, delete, custom actions — and the **rules** that run automatically.
3. **Behavior implementation (ABAP classes)** — the actual ABAP code behind those rules.

The central idea is the **business object** — a real-world thing the app manages (like a travel booking), combining its data with its behavior.

Determinations and validations live in **part 3** (the behavior implementation). They are *rules* that the framework fires automatically — you never call them from your code; the framework runs them for you.

\`\`\`
CDS data model      →  defines the data
BDEF behavior file  →  declares the rules (determinations, validations, actions)
behavior pool class →  ABAP code that implements those rules
\`\`\`

**Don't worry if the pieces seem abstract** — the next sections build them up one by one.`
            },
            {
              id: 'what-are-dets-and-vals',
              title: 'What are Determinations & Validations?',
              content: `Imagine booking a trip in a travel app:

- When you open a **new** booking, the app *auto-fills* fields for you — today's date, status "New", a booking number. That is a **determination**: the system computes or sets values so the user doesn't have to.
- When you submit, the app *checks* the form — "Is the end date after the begin date?" If not, it shows an error and stops you. That is a **validation**: the system checks values against business rules and reports problems.

**Plain English:**

- **Determination** = the system fills in / computes values automatically.
- **Validation** = the system checks values and reports errors or warnings.

Neither is triggered by the user directly — the **framework** decides when to run them.

| | Determination | Validation |
|---|---|---|
| Job | Set / derive field values | Check field values |
| Can it write? | Yes (declared fields) | No — read-only |
| What it reports | \`mapped\` (changes made) | \`failed\` + \`reported\` (errors) |
| When it runs | \`on create\` / \`on modify\` / \`on save\` | \`on save\` (or on demand) |

**Declared in the behavior definition (BDEF):**

\`\`\`abap
behavior for ZRAP_TRAVEL alias travel

  determination set_defaults on create { field Status; field BookingDate; }
  validation     check_dates    on save  { field BeginDate; field EndDate; }
\`\`\`

**Implemented in the behavior pool** — a class whose methods mirror those declarations. Method name = declaration name + trigger, snake_case:

\`\`\`abap
CLASS IMPLEMENTATION FOR BEHAVIOR OF zrap_travel.
  METHOD set_defaults_on_create.   " runs automatically on create
  METHOD check_dates_on_save.      " runs automatically before save
ENDCLASS.
\`\`\``
            },
            {
              id: 'execution-order',
              title: 'When do they run? The interaction phases',
              content: `Every operation (create, update, delete) runs through a fixed order of steps — the **interaction phases**:

\`\`\`
AD → D → V → A → S
\`\`\`

1. **AD — Activation**: prepares the instance when it is created or enabled.
2. **D — Determinations**: fill/compute values (e.g. set the status, compute a total).
3. **V — Validations**: check values against the rules (e.g. dates make sense).
4. **A — Actions**: operations the user explicitly triggered (e.g. "Confirm booking").
5. **S — Save**: write to the database.

**Why the order matters:**

- Determinations run **before** validations, so validations always check the *final, filled-in* values. Checking before the defaults were set would produce wrong errors.
- If a validation raises an error, **everything stops** — no actions run, nothing is saved, and the user gets a message.

**A simple way to remember it:**

> Determinations *do the work* (fill values), validations *do the checking* (find problems) — and both happen before anything is saved.

Within step 2 there are two more rules worth knowing:

- **Numbering runs first** — a determination that assigns keys (\`numbering on create\`) runs before other create determinations, so later logic can use the key.
- **One field, one determination** — a field may be set by at most one determination per trigger, which keeps responsibilities clean.`
            },
            {
              id: 'determinations-in-abap',
              title: 'A simple Determination — step by step',
              content: `**Goal:** when a new travel booking is created, automatically set \`Status\` to 'NEW' and \`BookingDate\` to today's date.

**1. Declare it in the BDEF:**

\`\`\`abap
behavior for ZRAP_TRAVEL alias travel

  determination set_defaults on create { field Status; field BookingDate; }
\`\`\`

**2. Implement it in the behavior pool:**

\`\`\`abap
METHOD set_defaults_on_create.
  " 1) Read the instances being created (the framework passes their keys)
  READ ENTITIES OF zrap_travel IN LOCAL MODE
    ENTITY travel
    FIELDS ( TravelId )           " read only what we need
    WITH CORRESPONDING #( keys )  " 'keys' = the new bookings
    RESULT DATA(lt_travels).      " result stored in table lt_travels

  " 2) Set the default values on every instance
  MODIFY ENTITIES OF zrap_travel IN LOCAL MODE
    ENTITY travel
    UPDATE FIELDS ( Status BookingDate )
    WITH VALUE #( FOR ls IN lt_travels
                  ( %tky        = ls-%tky
                    Status      = 'NEW'
                    BookingDate = sy-datum ) ).
ENDMETHOD.
\`\`\`

**Plain English:** "For every new booking, set \`Status\` to NEW and \`BookingDate\` to today." Two blocks do all the work:

- **READ ENTITIES** — loads the instances (from the in-memory entity buffer, not the database).
- **MODIFY ENTITIES** — applies the changes.
- **\`%tky\`** — the key that identifies each instance (the framework uses it to know *which* booking you mean).
- **\`sy-datum\`** — ABAP's built-in "today's date".

**Three rules to remember:**

- Always use **\`READ ENTITIES / MODIFY ENTITIES … IN LOCAL MODE\`** — never \`SELECT\` from the database here. RAP already holds the data in a buffer; \`SELECT\` would read stale, unsaved data.
- Process **all instances in one statement** (the \`FOR ls IN …\` pattern), not one row at a time.
- You can only change fields listed in your BDEF declaration.`
            },
            {
              id: 'validations-in-abap',
              title: 'A simple Validation — step by step',
              content: `**Goal:** reject a booking whose end date comes before its begin date, and show the user why.

**1. Declare it in the BDEF:**

\`\`\`abap
behavior for ZRAP_TRAVEL alias travel

  validation check_dates on save { field BeginDate; field EndDate; }
\`\`\`

**2. Implement it in the behavior pool:**

\`\`\`abap
METHOD check_dates_on_save.
  " 1) Read the instances that were changed
  READ ENTITIES OF zrap_travel IN LOCAL MODE
    ENTITY travel
    FIELDS ( BeginDate EndDate )
    WITH CORRESPONDING #( keys ) RESULT DATA(lt_travels).

  " 2) For every instance where the dates are wrong:
  LOOP AT lt_travels INTO DATA(ls)
       WHERE BeginDate > EndDate.

    " mark the instance as failed (stops the operation)
    APPEND VALUE #( %tky = ls-%tky ) TO failed-travel.

    " send a message that the user will see
    APPEND VALUE #( %tky = ls-%tky
                    %msg = cl_abap_behv=>new_message_with_text(
                      severity = if_abap_behv_message=>severity-error
                      text     = 'End date must not be before begin date' ) )
           TO reported-travel.
  ENDLOOP.
ENDMETHOD.
\`\`\`

**Plain English:** "For each booking where BeginDate is after EndDate, mark it failed and tell the user."

**The two output tables:**

- **\`failed\`** — "this instance is wrong, stop the operation." One entry per broken instance.
- **\`reported\`** — the messages shown to the user. **\`%tky\` is mandatory here** — without it the message cannot be attached to the right row.
- **Severity:** \`severity-error\` blocks the save; \`severity-warning\` lets the user continue with a notice.

**When it runs:** because it is declared \`on save\`, it fires automatically when the user saves. You can also trigger a validation earlier (e.g. inside an action) — covered in the Q&A below.`
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
