# Development Guidelines

These guidelines help ensure code quality, maintainability, and consistency for projects using Next.js, Supabase, and Tailwind CSS.

---

## Package Manager & Tooling

- **Always use [Yarn](https://yarnpkg.com/).**
- This project uses **Next.js** with **TypeScript**, styled via **Tailwind CSS**, and **Supabase** as the backend.
- Install dependencies with:
  ```
  yarn install
  ```
- Run scripts with:
  ```
  yarn dev        # Start Next.js development server
  yarn lint       # Run ESLint
  yarn format     # Run Prettier
  yarn test       # Run tests (if configured)
  yarn build      # Build for production
  ```
- Do **not** commit `package-lock.json` files; only `yarn.lock` should be tracked.

---

## Code Quality

- **Linting:** All code must pass strict ESLint rules.
- **Formatting:** All code must be formatted with Prettier.
- **Documentation:** Features, functions, and modules should be clearly documented using comments and/or Typedoc annotations.
- **Tests:** New features should include appropriate tests once testing infrastructure is in place.

---

## Development Workflow

1. **Clarify Requirements**
   - Review the assigned task and related documentation.
   - Identify ambiguities or missing details and ask clarifying questions before writing code.

2. **Outline the Solution**
   - Prepare a clear outline of the planned implementation.
   - Include key steps, components, and architectural considerations.

3. **Prepare Development Environment**
   - Pull the latest changes from the main development branch.
   - Verify the codebase is lint-free:
     ```
     yarn lint
     ```

4. **Create Feature Branch**
   - Create a new branch from the main development branch using a descriptive name:
     ```
     git checkout -b feat/short-descriptive-task-name
     ```

5. **Implement the Feature**
   - Develop the feature according to the approved outline.
   - Prioritize clean, maintainable, and well-structured code.
   - Document any architectural or design decisions.

6. **Testing**
   - Write and run appropriate unit and integration tests (if infrastructure is in place).

7. **Linting and Formatting**
   - Run linting and formatting tools:
     ```
     yarn lint
     yarn format
     ```

8. **Update Documentation**
   - Update or add relevant documentation (code comments, Typedoc, README, API docs).

9. **Code Review**
   - Perform a thorough self-review or request a peer review.
   - Address any feedback or identified issues.

10. **Manual Testing and Approval**
    - Perform manual testing and incorporate any feedback or required changes.

11. **Prepare Commit**
    - Use clear, descriptive commit messages summarizing the changes.

12. **Push Feature Branch**
    - Push the branch to the remote repository.

13. **Create Pull Request**
    - Open a Pull Request (PR) targeting the main development branch.
    - Request reviews as needed and squash/merge after approval.

---

## Code Quality Tools

- **ESLint:** Enforces strict linting rules.
- **Prettier:** Enforces consistent code formatting.
- **Typedoc:** Generates API documentation from TypeScript comments (optional).
- **Jest:** (Optional) Testing framework.
- **Supabase CLI:** For managing database migrations and local development.

---

## Additional Guidelines

- Use clear, descriptive commit messages.
- Keep PRs focused and small when possible.
- Avoid committing secrets or sensitive data.
- Follow the **12-factor app** principles for configuration.
- Prefer **async/await** over callbacks or `.then()` chains.
- Write modular, reusable code.

---

## Comment Style & Documentation

- Use **JSDoc** format for all functions, classes, and modules:
  ```typescript
  /**
   * Brief summary.
   *
   * @param {string} param1 - Description.
   * @returns {number} Description.
   */
  function example(param1: string): number {
    // Reason: Explain why this approach is used
  }
  ```
- Add inline comments for complex logic, especially with a `// Reason:` explanation.
- Keep documentation clear enough for a mid-level developer to understand.

---

## Modular Codebase Requirements

- Keep individual source files under 500 lines; refactor when approaching this limit.
- Organize code into feature-based modules with clear separation of concerns.
- Use consistent import/export patterns.
- Prefer small, reusable functions and classes.
- Avoid tightly coupled code; favor dependency injection or clear interfaces.

---


By following these guidelines, you help ensure a high-quality, maintainable, and well-documented codebase.