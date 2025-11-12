import { Conta } from "../model/Conta";
import { ContaRepository } from "../repository/ContaRepository";
import { colors } from "../utils/Colors";

export class ContaController implements ContaRepository {

    private listaContas: Array<Conta> = new Array<Conta>();
    numero: number = 0;

    procurarPorNumero(numero: number): void {
        let buscarConta = this.buscarNoArray(numero);
        if (buscarConta != null) {
            buscarConta.visualizar();
        } else {
            console.log(colors.fg.red, "\nA conta número: " + numero + " não foi encontrada!", colors.reset);
        }
    }

    listarTodas(): void {
        for (let conta of this.listaContas) {
            conta.visualizar();
        }
    }

    cadastrar(conta: Conta): void {
        this.listaContas.push(conta);
        console.log(colors.fg.green, "\nA conta número: " + conta.numero + " foi criada com sucesso!", colors.reset);
    }

    atualizar(conta: Conta): void {
        let buscarConta = this.buscarNoArray(conta.numero);
        if (buscarConta != null) {
            this.listaContas[this.listaContas.indexOf(buscarConta)] = conta;
            console.log(colors.fg.green, "\nA conta número: " + conta.numero + " foi atualizada com sucesso!", colors.reset);
        } else {
            console.log(colors.fg.red, "\nA conta número: " + conta.numero + " não foi encontrada!", colors.reset);
        } 
    }
    
    deletar(numero: number): void {
        let buscarConta = this.buscarNoArray(numero);
        if (buscarConta != null) {
            this.listaContas.splice(this.listaContas.indexOf(buscarConta), 1);
            console.log(colors.fg.green, "\nA conta número: " + numero + " foi deletada com sucesso!", colors.reset);
        } else {
            console.log(colors.fg.red, "\nA conta número: " + numero + " não foi encontrada!", colors.reset);
        }
    }
    sacar(numero: number, valor: number): void {
        throw new Error("Method not implemented.");
    }
    depositar(numero: number, valor: number): void {
        throw new Error("Method not implemented.");
    }
    transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {
        throw new Error("Method not implemented.");
    }

    gerarNumeroConta(): number {
        return ++this.numero;
    }

    public buscarNoArray(numero: number): Conta | null {
        for (let conta of this.listaContas) {
            if (conta.numero === numero)
            return conta;
        }
        return null;
    }
}

