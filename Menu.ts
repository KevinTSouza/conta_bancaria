import readlinesync = require("readline-sync");
import { colors } from "./src/utils/Colors";
import { Conta } from "./src/model/Conta";

export function main() {

    let opcao: number;

    const conta: Conta = new Conta(1, 123, 1, "Math", 10000);
    conta.visualizar();
    conta.sacar(10500);
    conta.visualizar();
    conta.depositar(5000);
    conta.visualizar();

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

        switch (opcao) {
            case 1:
                console.log(colors.fg.whitestrong,
                    "\n\nCriar Conta\n\n", colors.reset);
                keyPress();
                break;
            case 2:
                console.log(colors.fg.whitestrong,
                    "\n\nListar todas as contas\n\n", colors.reset);
                keyPress();
                break;
            case 3:
                console.log(colors.fg.whitestrong,
                    "\n\nBuscar dados da Conta - por número\n\n", colors.reset);
                keyPress();
                break;
            case 4:
                console.log(colors.fg.whitestrong,
                    "\n\nAtualizar dados da Conta\n\n", colors.reset);
                keyPress();
                break;
            case 5:
                console.log(colors.fg.whitestrong,
                    "\n\nApagar Conta\n\n", colors.reset);
                keyPress();
                break;
            case 6:
                console.log(colors.fg.whitestrong,
                    "\n\nSaque\n\n", colors.reset);
                keyPress();
                break;
            case 7:
                console.log(colors.fg.whitestrong,
                    "\n\nDepósito\n\n", colors.reset);
                keyPress();
                break;
            case 8:
                console.log(colors.fg.whitestrong,
                    "\n\nTransferência entre Contas\n\n", colors.reset);
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