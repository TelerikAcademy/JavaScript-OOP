module Collections {
    export class List<T> {
        private _collection: T[];

        add(item: T) {
            this._collection.push(item);
        }

        remove(item: T) {
            
        }

        get count() {
            return this._collection.length;
        }
    }
} 