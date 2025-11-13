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
    public sacar = (numero: number, valor: number) => {
        let buscarConta = this.buscarNoArray(numero);
        if (buscarConta != null) {
            if (buscarConta.sacar(valor) == true) {
                console.log(colors.fg.green, `\nSaque de R$ ${valor.toFixed(2)} na conta número: ${numero} realizado com sucesso!`, colors.reset);
            }
        } else {
            console.log(colors.fg.red, "\nA conta número: " + numero + " não foi encontrada!", colors.reset);
        }
    }
    depositar = (numero: number, valor: number) => {
        let buscarConta = this.buscarNoArray(numero);
        if (buscarConta != null) {
            buscarConta.depositar(valor);
            console.log(colors.fg.green, `\nDepósito de R$ ${valor.toFixed(2)} na conta número: ${numero} realizado com sucesso!`, colors.reset);
        } else {
            console.log(colors.fg.red, "\nA conta número: " + numero + " não foi encontrada!", colors.reset);
        }
    }
    transferir = (numeroOrigem: number, numeroDestino: number, valor: number) => {
        let buscarContaOrigem = this.buscarNoArray(numeroOrigem);
        let buscarContaDestino = this.buscarNoArray(numeroDestino);
        if (buscarContaOrigem != null && buscarContaDestino != null && numeroOrigem != numeroDestino) {
            if (buscarContaOrigem.sacar(valor) == true) {
                buscarContaDestino.depositar(valor);
                console.log(colors.fg.green, `\nTransferência de R$ ${valor.toFixed(2)} da conta número: ${numeroOrigem} para a conta número: ${numeroDestino}
                 realizado com sucesso!`, colors.reset);
            }
        } else {
            console.log(colors.fg.red, "\nUma das contas não foi encontrada!", colors.reset);
        }
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

