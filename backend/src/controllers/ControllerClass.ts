import path from 'path';
import fs from 'fs';
import { Router } from 'express';

export default abstract class Controller {
    public router: Router;
    protected using_path: boolean;
    private data_path: string;
    private data_local: any;

    constructor(use_path: boolean, router: Router, data_path: any = null, data_local: any = null) {
        this.using_path = use_path;
        this.router = router;
        this.data_path = data_path;
        if (data_local != null) {
            this.data_local = data_local
        }
        else {
            this.data_local = JSON.parse("[]")
        }
    }

    // Função que sera usada para iniciar as rotas, definindo os tipos e quais funções serao executadas quando elas forem chamadas.
    abstract startRouter(): void


    // Funcao usada para mudar o baco de dados que esta sendo usado:
    // - true: usa a rota para acessar o banco de dados.
    // - false: usa o banco de dados interno.
    public setUsingPath(value: boolean) {
        this.using_path = value
    }

    // Retorna o banco de dados que está sendo usado.
    public getDatabase(): any {
        if (this.using_path) {
            return JSON.parse(fs.readFileSync(this.data_path, 'utf-8'))
        } else {
            return this.data_local
        }
    }

  // Substitui os dados que estao sendo usados atualmente pelos dados recebidos.
  public setDatabase(data: any): any {
    if (this.using_path) {
        fs.writeFileSync(path.resolve(this.data_path), JSON.stringify(data, null, 2))
      } else {
        return this.data_local = data
      }
  }

  // Adiciona dados ao banco de dados que está sendo usado atualmente.
  public pushData(data: any) {
    if (this.using_path) {
      const current_data = JSON.parse(fs.readFileSync(this.data_path, 'utf-8'))
      current_data.push(data)
      fs.writeFileSync(path.resolve(this.data_path),JSON.stringify(current_data, null, 2))
    } else {
      this.data_local.push(data);
    }
  }

  // Limpa o banco de dados sendo usado atualmente.
  public resetDatabase(): any {
    if (this.using_path) {
        fs.writeFileSync(path.resolve(this.data_path), JSON.stringify(JSON.parse('[]'), null, 2))
      } else {
        return this.data_local = JSON.parse('[]')
      }
  }

  // Função de criar um novo arquivo com os bancos de dados que está sendo usado atualmente:
  public create_arquive(arquive_path: string) {
    const new_data = this.getDatabase();
    fs.writeFileSync(path.resolve(arquive_path), JSON.stringify(new_data, null, 2));
  }
}