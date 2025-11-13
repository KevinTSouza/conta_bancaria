import readlinesync = require("readline-sync");
import { colors } from "./src/utils/Colors";
import { Conta } from "./src/model/Conta";
import { ContaCorrente } from "./src/model/ContaCorrente";
import { ContaPoupanca } from "./src/model/ContaPoupanca";
import { ContaController } from "./src/controller/ContaController";

export function main() {

    let contas: ContaController = new ContaController();

    // Variaveis auxiliares
    let opcao, numero, agencia, tipo, saldo, limite, aniversario: number;
    let titular: string;

    const tipoContas = ["Conta Corrente", "Conta Poupanca"];

    /*
    const contacorrente: ContaCorrente = new ContaCorrente(2, 456, 2, "John", 15000, 1000);
    contacorrente.visualizar();
    contacorrente.sacar(6000);
    contacorrente.visualizar();
    contacorrente.depositar(2000);
    contacorrente.visualizar();

    const contapoupanca: ContaPoupanca = new ContaPoupanca(3, 789, 3, "Jane", 1000, 10);
    contapoupanca.visualizar();
    contapoupanca.sacar(9000);
    contapoupanca.visualizar();
    contapoupanca.depositar(3000);
    contapoupanca.visualizar();
    */

    console.log("\nCriar Contas\n");

    let cc1: ContaCorrente = new ContaCorrente(contas.gerarNumeroConta(), 123, 1, "João da Silva", 1000, 100.0);
    contas.cadastrar(cc1);

    let cc2: ContaCorrente = new ContaCorrente(contas.gerarNumeroConta(), 124, 1, "Maria da Silva", 2000, 100.0);
    contas.cadastrar(cc2);

    let cp1: ContaPoupanca = new ContaPoupanca(contas.gerarNumeroConta(), 125, 2, "Mariana dos Santos", 4000, 12);
    contas.cadastrar(cp1);

    let cp2: ContaPoupanca = new ContaPoupanca(contas.gerarNumeroConta(), 125, 2, "Juliana Ramos", 8000, 15);
    contas.cadastrar(cp2);

    contas.listarTodas();

    while (true) {
        console.log(colors.bg.black, colors.fg.yellow);
        console.log("*****************************************************************************************************");
        console.log("                                                                                                     ");
        console.log("                                         BANCO DO BRAZIL COM Z                                       ");
        console.log("                                                                                                     ");
        console.log("*****************************************************************************************************");
        console.log("                                                                                                     ");
        console.log("                                       1 - Criar Conta                                               ");
        console.log("                                       2 - Listar todas as contas                                    ");
        console.log("                                       3 - Buscar conta por número                                   ");
        console.log("                                       4 - Atualizar dados da conta                                  ");
        console.log("                                       5 - Apagar conta                                              ");
        console.log("                                       6 - Sacar                                                     ");
        console.log("                                       7 - Depositar                                                 ");
        console.log("                                       8 - Transferir Valores entre Contas                           ");
        console.log("                                       9 - Sair                                                      ");
        console.log("                                                                                                     ");
        console.log("*****************************************************************************************************");
        console.log("                                                                                                     ",
            colors.reset);

        console.log("Entre com a opção desejada: ");
        opcao = readlinesync.questionInt("");

        if (opcao == 9) {
            console.log(colors.fg.greenstrong,
                "\nBanco do Brazil com Z - O seu futuro começa aqui!");
            sobre();
            console.log(colors.reset, "");
            process.exit(0);
        }

        // implementar try catch aqui
        switch (opcao) {
            case 1:
                console.log(colors.fg.whitestrong, "\n\nCriar Conta\n\n", colors.reset);

                console.log("Digite o numero da agência: ");
                agencia = readlinesync.questionInt("");

                console.log("Digite o nome do titular da conta: ");
                titular = readlinesync.question("");

                console.log("Selecione o tipo da conta: ");
                tipo = readlinesync.keyInSelect(tipoContas, "", { cancel: false }) + 1;

                console.log("Digite o saldo inicial da conta: ");
                saldo = readlinesync.questionFloat("");
                switch (tipo) {
                    case 1:
                        console.log("Digite o limite da conta (R$): ");
                        limite = readlinesync.questionFloat("");
                        contas.cadastrar(new ContaCorrente(contas.gerarNumeroConta(), agencia, tipo, titular, saldo, limite));
                        break;

                    case 2:
                        console.log("Digite o dia aniversário da conta poupança: ");
                        aniversario = readlinesync.questionInt("");
                        contas.cadastrar(new ContaPoupanca(contas.gerarNumeroConta(), agencia, tipo, titular, saldo, aniversario));
                        break;
                }
                keyPress();
                break;

            case 2:
                console.log(colors.fg.whitestrong,
                    "\n\nListar todas as contas\n\n", colors.reset);
                contas.listarTodas();
                keyPress();
                break;

            case 3:
                console.log(colors.fg.whitestrong,
                    "\n\nBuscar dados da Conta - por número\n\n", colors.reset);

                console.log("Digite o número da conta: ");
                numero = readlinesync.questionInt("");
                contas.procurarPorNumero(numero);
                keyPress();
                break;

            case 4:
                console.log(colors.fg.whitestrong,
                    "\n\nAtualizar dados da Conta\n\n", colors.reset);

                console.log("Digite o número da conta: ");
                numero = readlinesync.questionInt("");

                let conta = contas.buscarNoArray(numero);
                if (conta != null) {
                    console.log("Digite o numero da agência: ");
                    agencia = readlinesync.questionInt("");

                    console.log("Digite o nome do titular da conta: ");
                    titular = readlinesync.question("");

                    tipo = conta.tipo;

                    console.log("Digite o saldo da conta: ");
                    saldo = readlinesync.questionFloat("");

                    switch (tipo) {
                        case 1:
                            console.log("Digite o limite da conta (R$): ");
                            limite = readlinesync.questionFloat("");
                            contas.atualizar(
                                new ContaCorrente(numero, agencia, tipo, titular, saldo, limite));
                            break;
                        case 2:
                            console.log("Digite o dia aniversário da conta poupança: ");
                            aniversario = readlinesync.questionInt("");
                            contas.atualizar(new ContaPoupanca(numero, agencia, tipo, titular, saldo, aniversario));
                            break;
                    }
                } else {
                    console.log(colors.fg.red, "\nA conta número: " + numero + " não foi encontrada!", colors.reset);
                }

                keyPress();
                break;
            case 5:
                console.log(colors.fg.whitestrong,
                    "\n\nApagar Conta\n\n", colors.reset);

                console.log("Digite o número da conta: ");
                numero = readlinesync.questionInt("");

                contas.deletar(numero);
                keyPress();
                break;

            case 6:
                console.log(colors.fg.whitestrong,
                    "\n\nSaque\n\n", colors.reset);

                console.log("Digite o número da conta: ");
                numero = readlinesync.questionInt("");

                console.log("Digite o valor do saque: ");
                let valorSaque = readlinesync.questionFloat("");

                contas.sacar(numero, valorSaque);
                keyPress();
                break;

            case 7:
                console.log(colors.fg.whitestrong,
                    "\n\nDepósito\n\n", colors.reset);

                console.log("Digite o número da conta: ");
                numero = readlinesync.questionInt("");

                console.log("Digite o valor do depósito: ");
                let valorDeposito = readlinesync.questionFloat("");

                contas.depositar(numero, valorDeposito);
                keyPress();
                break;

            case 8:
                console.log(colors.fg.whitestrong,
                    "\n\nTransferência entre Contas\n\n", colors.reset);

                console.log("Digite o número da conta de origem: ");
                let numeroOrigem = readlinesync.questionInt("");

                console.log("Digite o número da conta de destino: ");
                let numeroDestino = readlinesync.questionInt("");

                console.log("Digite o valor da transferência: ");
                let valorTransferencia = readlinesync.questionFloat("");

                contas.transferir(numeroOrigem, numeroDestino, valorTransferencia);
                keyPress();
                break;

            default:
                console.log(colors.fg.redstrong,
                    "\nOpção Inválida! Tente novamente.\n", colors.reset);
                keyPress();
                break;
        }
    }
}

export function sobre(): void {
    console.log("\n*****************************************************************************************************");
    console.log("Desenvolvido por: Kevin Souza");
    console.log("Generation Brasil - generation@generation.org");
    console.log("https://github.com/KevinTSouza/conta_bancaria");
    console.log("*****************************************************************************************************");
}

export function keyPress(): void {
    console.log(colors.reset, "");
    console.log("Pressione ENTER para continuar...");
    readlinesync.prompt();
}

main();