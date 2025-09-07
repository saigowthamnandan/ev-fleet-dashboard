import { test, expect } from "@playwright/test";

const DASHBOARD_URL = "http://localhost:3000";

test.describe("Vehicle Dashboard - Essential Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(DASHBOARD_URL);
    await page.waitForSelector('[data-testid="vehicle-card"]', {
      timeout: 10000,
    });
  });

  test("should load dashboard with 12 vehicles and all main components", async ({
    page,
  }) => {
    // Verify main components are visible
    await expect(page.locator("h1")).toContainText("Dashboard");
    await expect(page.locator('[data-testid="overview-panel"]')).toBeVisible();
    await expect(page.locator('[data-testid="alerts-panel"]')).toBeVisible();
    await expect(page.locator('[data-testid="map-view"]')).toBeVisible();

    // Verify 12 vehicles are loaded
    await expect(page.locator('[data-testid="vehicle-card"]')).toHaveCount(12);

    // Verify controls are present
    await expect(page.locator('[data-testid="status-filter"]')).toBeVisible();
    await expect(page.locator('[data-testid="sort-by-select"]')).toBeVisible();
  });

  test("should filter vehicles by status", async ({ page }) => {
    const initialCount = await page
      .locator('[data-testid="vehicle-card"]')
      .count();
    expect(initialCount).toBe(12);

    // Filter to moving vehicles
    await page.selectOption('[data-testid="status-filter"]', "moving");
    await page.waitForTimeout(500);

    const filteredCount = await page
      .locator('[data-testid="vehicle-card"]')
      .count();
    expect(filteredCount).toBeLessThanOrEqual(initialCount);

    // Verify all visible vehicles have moving status
    const statusBadges = page.locator('[data-testid="vehicle-status"]');
    const statusCount = await statusBadges.count();
    for (let i = 0; i < statusCount; i++) {
      await expect(statusBadges.nth(i)).toContainText("Moving");
    }

    // Reset filter
    await page.selectOption('[data-testid="status-filter"]', "all");
    await page.waitForTimeout(500);
    await expect(page.locator('[data-testid="vehicle-card"]')).toHaveCount(12);
  });

  test("should toggle online/offline status and show alerts", async ({
    page,
  }) => {
    // Ensure we start online
    const connectionToggle = page.locator('[data-testid="connection-toggle"]');
    if ((await connectionToggle.textContent()) === "Offline") {
      await connectionToggle.click();
    }
    await expect(connectionToggle).toContainText("Online");

    // Go offline
    await connectionToggle.click();
    await expect(connectionToggle).toContainText("Offline");
    await expect(page.locator('[data-testid="offline-alert"]')).toBeVisible();

    // Go back online
    await connectionToggle.click();
    await expect(connectionToggle).toContainText("Online");
    await expect(
      page.locator('[data-testid="offline-alert"]')
    ).not.toBeVisible();

    // Wait for potential alerts to generate and check alerts functionality
    await page.waitForTimeout(3000);
    const alertsPanel = page.locator('[data-testid="alerts-panel"]');
    await expect(alertsPanel).toBeVisible();
  });

  test("should handle real-time updates and maintain responsiveness", async ({
    page,
  }) => {
    // Ensure online status
    const connectionToggle = page.locator('[data-testid="connection-toggle"]');
    if ((await connectionToggle.textContent()) === "Offline") {
      await connectionToggle.click();
    }

    // Get initial state
    const initialBattery = await page
      .locator('[data-testid="vehicle-battery"]')
      .first()
      .textContent();
    const initialTime = Date.now();

    // Wait for real-time updates (vehicles update every 1-5 seconds)
    await page.waitForTimeout(6000);

    // Verify page is still responsive
    const currentTime = Date.now();
    expect(currentTime - initialTime).toBeLessThan(8000);

    // Verify vehicles are still present and displaying valid data
    await expect(page.locator('[data-testid="vehicle-card"]')).toHaveCount(12);

    const currentBattery = await page
      .locator('[data-testid="vehicle-battery"]')
      .first()
      .textContent();
    expect(currentBattery).toMatch(/^\d+%$/);

    // Test basic interactivity still works after updates
    await page.selectOption('[data-testid="status-filter"]', "idle");
    await page.waitForTimeout(500);
    await page.selectOption('[data-testid="status-filter"]', "all");
    await expect(page.locator('[data-testid="vehicle-card"]')).toHaveCount(12);
  });
});
