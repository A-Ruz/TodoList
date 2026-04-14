export class TodoPage {
     constructor(page) {
        this.page = page;
        this.updatebox = '#inplaceeditor #updatebox';
        this.submitButton = '#inplaceeditor input[type="submit"]';
        this.listContainer = 'ul.categorycontainer';
        this.taskItems = page.locator('#mytodos li');
        this.tomorrowTitle = '#tomorrowtitle';
        this.newTodo = '#newtodo';
        this.myTodos = '#mytodos';
        this.tomorrowListOpen = '#tomorrowarrow';
        this.deleteButton = 'img.delete';
        this.doneTasks = page.locator('#mydonetodos li');
        this.purgeButton = '.purge';
        this.sortButton = '#sortbutton';
        this.sortAplhabeticallyButton = '#sortselect #sort1';
        this.addListButton = '#addlist';
        this.listItems = page.locator('ul.categorycontainer li');
        this.addCategoryButton = '#adddivider'
        this.myCategoriesContainer = '#mycategories';
        this.listCategories = page.locator('.categories li.showcategory');
    }

    async open() {
        await this.page.goto('/');
    }

    async createNewCategory(text)
    {
        await this.page.locator(this.addCategoryButton).click();
        await this.page.waitForTimeout(500);

        await this.fillEditFieldAndSubmit(text, this.myCategoriesContainer);
    }

    async addNewList(text)
    {
        await this.page.locator(this.addListButton).click();
        await this.fillEditFieldAndSubmit(text, this.listContainer);
    }

    async fillEditFieldAndSubmit(text, container)
    {
        await this.page.locator(container + ' ' + this.updatebox).fill(text);
        await this.page.locator(container + ' ' + this.submitButton).click();
    }

    async moveToTomorrow(text)
    {
        const task = this.taskItems.filter({ hasText: text }).first();
        const target = this.page.locator(this.tomorrowTitle);
        
        this.page.waitForTimeout(1000);

        await task.dragTo(target);
    }

    async addTask(text)
    {
        await this.page.locator(this.newTodo).fill(text);
        await this.page.locator(this.newTodo).press('Enter');
    }

    async editTask(text)
    {
        const task = this.taskItems.first();
        await task.dblclick();
        await this.fillEditFieldAndSubmit(text, this.myTodos);
    }

    async uncompleteTask(text)
    {
        const task = this.doneTasks.filter({ hasText: text }).first();

        await task.locator('input').uncheck();
    }

    async openTomorrowList()
    {
        await this.page.locator(this.tomorrowListOpen).click();
    }

    async deleteTask(text)
    {
        const task = this.taskItems.filter({ hasText: text }).first();
        await task.hover();
        await task.locator(this.deleteButton).click();
    }

    async completeTask(text)
    {
        const task = this.taskItems.filter({ hasText: text }).first();
        await task.locator('input').check();
    }

    async removeCompletedTask(text)
    {
        const task = this.taskItems.filter({ hasText: text }).first();
        await task.hover();
        await task.locator(this.deleteButton).click();
    }

    async removeAllCompletedTasks()
    {
        await this.page.locator(this.purgeButton).click();
    }

    async sortAplhabetically()
    {
        await this.page.locator(this.sortButton).hover();

        await this.page.locator(this.sortAplhabeticallyButton).click();
    }

    async editList(elementText, newText)
    {
        const list = this.listItems.filter({ hasText: elementText }).first();
        await list.locator('span.listname').dblclick();

        await this.page.locator(this.updatebox).fill(newText);

        await this.page.locator(this.submitButton).click();
    }

    async deleteList(text)
    {
        const list = this.listItems.filter({ hasText: text }).first();
        await list.hover();
        await list.locator(this.deleteButton).click();
    }

    async editCategory(text, newText)
    {
        const category = this.listCategories.filter({ hasText: text }).first();
        await category.dblclick();

        await this.page.locator(this.updatebox).fill(newText);

        await this.page.locator(this.submitButton).click();
    }

    async deleteCategory(text)
    {
        const category = this.listCategories.filter({ hasText: text }).first();
        await category.hover();
        await category.locator(this.deleteButton).click();
    }
}