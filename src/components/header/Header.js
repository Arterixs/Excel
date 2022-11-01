import {ExcelComponents} from '@core/ExcelComponents';

export class Header extends ExcelComponents {
    static className = 'excel__header'
    constructor($root) {
        super($root)
    }
    toHTML() {
        return `
        <input class="input" type="text" value="Новая таблица">
        <div>
            <div class="button">
                <span class="material-icons">delete</span>
            </div>
            <div class="button">
                <span class="material-icons">exit_to_app</span>
            </div>
        </div>
        `
    }
}
