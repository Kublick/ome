# Personal Budgeting System - Implementation Plan

**Project:** Build a full-featured personal budgeting application that tracks expenses across multiple accounts (cash, credit, investments), categorizes spending, supports installment payments, and enables saving funds—all integrated with the existing TanStack Start, oRPC, and Better Auth architecture.

---

## Steps

### 1. Define database schema
Create Prisma models in `prisma/schema.prisma` for the budgeting system:
- **Account** model: Track different financial accounts (cash, credit, investment) with fields for name, type, balance, currency, userId
- **Category** model: Expense/income categories with optional parent category for hierarchy
- **Transaction** model: Individual financial transactions with amount, date, description, categoryId, accountId, userId
- **Budget** model: Monthly/yearly budgets per category with amount limits and periods
- **Installment** model: Split payments tracking with totalAmount, numberOfPayments, remaining payments, linked to transactions
- **SavingFund** model: Savings goals with target amount, current amount, deadline, linked transactions

Add proper relations to existing `User` model and run migrations.

### 2. Build oRPC API routers
Create new routers in `src/orpc/router/` directory:
- **accounts.ts**: CRUD operations for accounts (list, create, update, delete, getBalance)
- **transactions.ts**: Transaction management (list with filters, create, update, delete, getByCategory, getByDateRange)
- **categories.ts**: Category management (list, create, update, delete, getHierarchy)
- **budgets.ts**: Budget operations (list, create, update, delete, getSpendingVsLimit)
- **installments.ts**: Installment tracking (create, list, markAsPaid, getUpcoming)
- **savingFunds.ts**: Savings goals (create, list, update, addContribution, getProgress)

Define Zod validation schemas in `src/orpc/schema.ts` for all inputs/outputs. Register all routers in `src/orpc/router/index.ts`.

### 3. Create dashboard pages and routes
Build protected routes under `src/routes/dashboard/`:
- **accounts.tsx**: List all accounts with balances, add/edit/delete functionality
- **transactions.tsx**: Transaction list with filtering, sorting, pagination using TanStack Table
- **budget.tsx**: Budget overview with category spending vs limits, progress bars
- **installments.tsx**: Upcoming and completed installments tracking
- **savings.tsx**: Saving funds with progress visualization and contribution history
- **overview.tsx**: Update existing overview with summary cards, recent transactions, budget alerts

Use TanStack Router loaders with `queryClient.prefetchQuery()` for SSR data loading.

### 4. Implement transaction and account forms
Create form components using TanStack Form pattern:
- **TransactionForm**: Date picker (Calendar), amount input (Input), category select (Select), account select, description textarea (Textarea), installment checkbox
- **AccountForm**: Name, type select (cash/credit/investment), initial balance, currency
- **CategoryForm**: Name, parent category select (for hierarchy), icon/color picker
- **BudgetForm**: Category select, amount limit, period select (monthly/yearly)
- **InstallmentForm**: Total amount, number of payments, start date, frequency
- **SavingFundForm**: Goal name, target amount, deadline (Calendar), linked account

Use existing UI components (`Field`, `Select`, `Input`, `Calendar`, `Textarea`, `Button`) and validation with Zod schemas. Implement with `useMutation` for create/update operations.

### 5. Build data visualization components
Create components for insights and reporting:
- **TransactionsTable**: Use TanStack Table with columns for date, description, category badge, amount, account, actions. Implement filtering by date range, category, account type, and search
- **BudgetProgressCards**: Card components showing category name, spent amount, budget limit, Progress bar, percentage, and warning badges for overspending
- **CategoryBreakdownChart**: Pie or bar chart using Chart component showing spending distribution across categories
- **AccountSummaryCards**: Display total balance per account type with trend indicators
- **SavingFundsProgress**: Cards with progress bars showing current vs target amounts with estimated completion dates

Use existing components: `Table`, `Card`, `Badge`, `Progress`, `Chart`, `Skeleton` for loading states.

### 6. Implement business logic features
Add server-side logic in oRPC handlers:
- **Installment automation**: When creating installment, generate linked pending transactions for future payments with calculated due dates
- **Auto-categorization**: Implement keyword-based suggestion logic for transaction categories based on description patterns
- **Saving fund contributions**: Automatically update fund progress when linked transactions are created
- **Account balance sync**: Recalculate and update account balances when transactions are added/edited/deleted with transaction wrapping
- **Budget tracking**: Calculate period spending by summing transactions per category with date range filtering
- **Transaction validation**: Ensure sufficient balance for debit transactions on cash/credit accounts

Implement proper error handling, TypeScript types from Prisma client, and transaction atomicity for multi-step operations.

---

## Further Considerations & Decisions Needed

### 1. Account types structure
**Question:** Should each account type (cash, credit, investment) be a separate Prisma model or use an enum field?

**Options:**
- **Option A:** Single `Account` model with `accountType` enum (CASH, CREDIT, INVESTMENT) - Simpler queries, shared logic
- **Option B:** Separate models (`CashAccount`, `CreditAccount`, `InvestmentAccount`) - More type-safe, specific fields per type
- **Option C:** Single model with `accountType` enum + polymorphic JSON metadata field - Flexible for type-specific data, less validated

**Recommendation:** Option A for MVP simplicity, migrate to Option C if type-specific fields are needed later.

### 2. Installment scheduling
**Question:** Should installments auto-generate future transactions or be created manually each period?

**Options:**
- **Option A:** Auto-generate all future transactions immediately with "pending" status
- **Option B:** Generate transactions manually/on-demand each period
- **Option C:** Auto-generate but require user confirmation before posting

**Recommendation:** Option C - Auto-generate for visibility but require confirmation for user control and accuracy.

### 3. Category hierarchy
**Question:** Do you need nested categories (e.g., Food > Restaurants > Fast Food) or flat categories?

**Implementation:** Nested categories require:
- Self-referential relation in Prisma: `parentId` field with optional `parent Category?` and `children Category[]`
- Recursive queries for full tree traversal
- Breadcrumb UI components for navigation

**Recommendation:** Start with flat categories for MVP, add hierarchy if needed based on category count.

### 4. Multi-currency support
**Question:** Will accounts hold different currencies requiring conversion rates and tracking?

**Options:**
- **Option A:** Single currency only - Simpler implementation
- **Option B:** Multi-currency with manual conversion - User enters amounts in base currency
- **Option C:** Multi-currency with automatic conversion - Requires exchange rate API and historical rate tracking

**Recommendation:** Option A for MVP unless multi-currency is core requirement.

### 5. Recurring transactions
**Question:** Should the system support recurring expenses (subscriptions, bills) beyond installments?

**Implementation requires:**
- `RecurringTransaction` model with schedule patterns (daily, weekly, monthly, yearly)
- Cron job or scheduled task to auto-generate transactions
- UI to manage recurring transaction templates

**Recommendation:** Add if automatic subscription tracking is important, otherwise handle manually with transaction templates.

---

## Technical Architecture Summary

**Database:** PostgreSQL + Prisma ORM  
**API Layer:** oRPC with Zod validation  
**Frontend:** TanStack Start (React) with TanStack Router  
**Data Fetching:** TanStack Query with SSR prefetching  
**Forms:** TanStack Form with custom field components  
**Auth:** Better Auth with existing User model  
**UI:** Custom component library (shadcn/ui style)  

**File Structure:**

 