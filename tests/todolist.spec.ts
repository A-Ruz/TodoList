import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/Todo.page';
import { listData } from '../testData/list';
import { categoryData } from '../testData/category';
import { taskData } from '../testData/task';

test.describe('Todo page tests', () => {
    let todoPage: TodoPage;

    test.beforeEach(async ({ page }) => {
        todoPage = new TodoPage(page);
        await todoPage.open();
    });

     test('edit task works', async ({ page }) => {
        await todoPage.editTask(taskData.edited);

        await expect(page.locator('#mytodo_0')).toHaveText(taskData.edited);
    });


    test('add task works', async ({ page }) => {
        await todoPage.addTask(taskData.new);

        await expect(page.locator('#mytodos li:last-child span')).toHaveText(taskData.new);
    });

    test('delete task works', async ({ page }) => {
        await todoPage.addTask(taskData.new);
        await todoPage.deleteTask(taskData.new);

        await expect(page.locator('#mytodos')).not.toContainText(taskData.new);
    });

    test('complete task works', async ({ page }) => {
        await todoPage.addTask(taskData.new);
        await todoPage.completeTask(taskData.new);

        await expect(page.locator('#mydonetodos')).toContainText(taskData.new);
    });

    test('uncomplete task works', async ({ page }) => {
        await todoPage.addTask(taskData.new);
        await todoPage.completeTask(taskData.new);
        await page.waitForTimeout(1000);
        await todoPage.uncompleteTask(taskData.new);

        await page.waitForTimeout(1000);

        await expect(page.locator('#mytodos')).toContainText(taskData.new);
    });

    test('remove completed works', async ({ page }) => {
        await todoPage.addTask(taskData.new);
        await todoPage.completeTask(taskData.new);
        await todoPage.removeCompletedTask(taskData.new);

        await expect(page.locator('#mydonetodos')).not.toContainText(taskData.new);
    });

    test('remove all completed works', async ({ page }) => {      
        await todoPage.addTask(taskData.new);
        await todoPage.completeTask(taskData.new);
        await page.waitForTimeout(1000);
        await todoPage.removeAllCompletedTasks();

        await expect(page.locator('#mydonetodos')).not.toContainText(taskData.new);
    });

    test('add to tommorow works', async ({ page }) => {        
        await todoPage.addTask(taskData.new);

        await page.waitForTimeout(1000);

        await todoPage.moveToTomorrow(taskData.new);

        await page.waitForTimeout(1000);

        await todoPage.openTomorrowList();

        await expect(page.locator('#tomorrowitemspanel')).toContainText(taskData.new);
    });

    test('sorting alphabettically works', async ({ page }) => {        
        await todoPage.sortAplhabetically();

        await page.waitForTimeout(1000);

        await expect(page.locator('#mytodos')).toHaveText("All changes are saved locally, automatically.All done. Tick all the items off then hit the trash icon below.Drag the list, Example template, over this lists title above.Drag this item onto another list (on the right) to transfer it.Drag this item up or down to re-order it.Howdy. Let's get you up and running.The list, Important Info, is worth a quick look.");
    });

    test('add new list works', async ({ page }) => {        
        await todoPage.addNewList(listData.new);

        await page.waitForTimeout(1000);

        await expect(page.locator('ul.categorycontainer')).toContainText(listData.new);
    });

    test('edit list works', async ({ page }) => {  
        await todoPage.addNewList(listData.new);

        await todoPage.editList(listData.new, listData.edited);

        await expect(page.locator('ul.categories .categorycontainer')).toContainText(listData.edited);
    });

    test('delete list works', async ({ page }) => {       
        await todoPage.addNewList(listData.new);
        await todoPage.deleteList(listData.new);

        await expect(page.locator('ul.categories .categorycontainer')).not.toContainText(listData.new);
    });

    test('add new category works', async ({ page }) => {       
        await todoPage.createNewCategory(categoryData.new);

        await expect(page.locator('#mycategories')).toContainText("New category");
    });

    test('edit new category works', async ({ page }) => {        
        await todoPage.createNewCategory(categoryData.new);
        await todoPage.editCategory(categoryData.new, categoryData.edited);

        await expect(page.locator('#mycategories')).toContainText(categoryData.edited);
    });

    test('delete category works', async ({ page }) => {        
        await todoPage.createNewCategory(categoryData.new);
        await todoPage.deleteCategory(categoryData.new);

        await expect(page.locator('#mycategories')).not.toContainText(categoryData.new);
    });
});
