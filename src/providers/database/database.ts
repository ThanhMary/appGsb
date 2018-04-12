import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import {LOCALE_ID} from '@angular/core';
@Injectable()
export class DatabaseProvider {
 
  constructor(private sqlite: SQLite) { }
 
  /**
   * Crée une base de donnée 
   */
  public getDB() {
    return this.sqlite.create({
      name: 'products.db',
      location: 'default'
    });
  }
 
  /*
   * Crée la structure de base de données initiale
   */
  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {
 
        // Creation des tables
        this.createTables(db);
 
        // Inserrer des items par defaut
        this.insertDefaultItems(db);
 
      })
      .catch(e => console.log(e));
  }
 
  /**
   * Création de tables dans la base de données
   * @param db
   */
  private createTables(db: SQLiteObject) {
    // Création des tables
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS categories (id integer primary key AUTOINCREMENT NOT NULL, name TEXT)'],
      ['CREATE TABLE IF NOT EXISTS products (id integer primary key AUTOINCREMENT NOT NULL, name TEXT, price REAL, duedate DATE, active integer, category_id integer, FOREIGN KEY(category_id) REFERENCES categories(id))']
    ])
      .then(() => console.log('Tables créées'))
      .catch(e => console.error('Erreur', e));
  }
 
  /**
   *Y compris les données par défaut
   * @param db
   */
  private insertDefaultItems(db: SQLiteObject) {
    db.executeSql('select COUNT(id) as qtd from categories', {})
   .then((data: any) => {
     // S'il n'y a pas d'enregistrement
     if (data.rows.item(0).qtd == 0) {
         //Inserer dans le table de catérogie
        db.sqlBatch([
          ['insert into categories (name) values (?)', ['Hambúrgueres']],
          ['insert into categories (name) values (?)', ['Bebidas']],
          ['insert into categories (name) values (?)', ['Sobremesas']]
        ])
          .then(() => console.log('Données standard incluses'))
          .catch(e => console.error('Impossible inclure les données par défaut', e));
       }
   })
    .catch(e => console.error('Erreur lors de interrogation des catégories qtd', e));
  }
}