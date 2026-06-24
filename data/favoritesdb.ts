import { type SQLiteDatabase } from 'expo-sqlite';

export interface Item {
  id: number;
  name: string;
  quantity: number;
  image: string | null;
  cart: number;
  favorite: number; 
  price: number;
  ingredients: string[]; 
  flavor?: string;       
  sweetness?: string;     
  boba?: string;  
}


export const initDb = async (db: SQLiteDatabase): Promise<void> => {

  // Command to erase table when error occurs
  //await db.execAsync("DROP TABLE IF EXISTS Boba;");

  // made separate parameters for marking whether item is in 
  // cart or favorites to make them independent of one another
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS Boba (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      image TEXT,
      cart INTEGER DEFAULT 0,
      favorite INTEGER DEFAULT 0,
      price REAL DEFAULT 3,
      flavor TEXT DEFAULT '',
      sweetness TEXT DEFAULT '',
      boba TEXT DEFAULT ''
    );
  `);
  

  try {
    await db.execAsync(`ALTER TABLE Boba ADD COLUMN price REAL DEFAULT 3;`);
  } catch (err) {
    // Column probably already exists, ignore error
  }
};

export const markFavorite = async (db: SQLiteDatabase, id: number, isFavorite: boolean) => {
  await db.runAsync(
    "UPDATE Boba SET favorite = ? WHERE id = ?;",
    [isFavorite ? 1 : 0, id]
  );
};
export const getCartItem = async (db: SQLiteDatabase, id: number): Promise<Item | null> => {
  const item = await db.getFirstAsync<Item>(
    "SELECT * FROM Boba WHERE id = ? AND cart = 1;",
    [id]
  );
  return item ?? null;
};

export const markCart = async (db: SQLiteDatabase, id: number, inCart: boolean) => {
  if (!inCart) {
    await db.runAsync("UPDATE Boba SET cart = 0 WHERE id = ?", [id]);
    return;
  }

  // check if item already in cart
  const existing = await getCartItem(db, id);

  if (existing) {

    // if exists increase quanitity by 1
    await db.runAsync(
      "UPDATE Boba SET quantity = quantity + 1 WHERE id = ?;",
      [id]
    );
  } else {
    
    // if not in cart mark as cart = 1
    await db.runAsync("UPDATE Boba SET cart = 1 WHERE id = ?", [id]);
  }
};

export const insertItem = async (
  db: SQLiteDatabase,
  name: string,
  quantity: number,
  image: string | null,
  price: number,
  flavor: string = "",
  sweetness: string = "",
  boba: string = "",
): Promise<number> => {
  const result = await db.runAsync(
    `INSERT INTO Boba 
      (name, quantity, image, price, flavor, sweetness, boba) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [name, quantity, image ?? null, price ?? 3, flavor, sweetness, boba]
  );

    // Learned from PHP: how to use lastInsertRowId in SQL to return an id to use
  return result.lastInsertRowId;
};

export const fetchItems = async (db: SQLiteDatabase): Promise<Item[]> => {
  return db.getAllAsync<Item>("SELECT * FROM Boba;");
};

export const fetchFavorites = async (db: SQLiteDatabase): Promise<Item[]> => {
  return db.getAllAsync<Item>("SELECT * FROM Boba WHERE favorite = 1;");
};

export const fetchCartItems = async (db: SQLiteDatabase): Promise<Item[]> => {
  const rows = await db.getAllAsync<any>(`
    SELECT id, name, quantity, image, cart, favorite, price, flavor, sweetness, boba 
    FROM Boba WHERE cart = 1;
  `);

  return rows.map(row => ({
    ...row,
    ingredients: [row.flavor, row.sweetness, row.boba].filter(Boolean),
  }));
};



export const updateItem = async (
  db: SQLiteDatabase,
  id: number,
  name: string,
  quantity: number,
  image: string, 
  price?: number
): Promise<void> => {
  await db.runAsync( "UPDATE Boba SET name = ?, quantity = ?, image = ?, price = ? WHERE id = ?;",
    [name, quantity, image ?? null, price ?? 3, id]);
};

export const deleteItem = async (db: SQLiteDatabase, id: number): Promise<void> => {
  await db.runAsync("DELETE FROM Boba WHERE id = ?;", [id]);
};

export const clearCart = async (db: SQLiteDatabase): Promise<void> => {
  await db.runAsync("UPDATE Boba SET cart = 0;");
};



