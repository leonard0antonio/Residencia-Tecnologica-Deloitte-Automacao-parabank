import { test, expect } from '@playwright/test';
import { generateNewUser } from '../utils/generateUser';

// 2. Criando regras antes de todo código (Escopo do Arquivo)
let usuario: string;
let senha: string;
let nomeUsuario: string;

test.beforeAll("Registrar dados do usuário", async () => {
    // Gera dados de um usuário totalmente novo para esta suíte de testes
    const dadosAleatorios = generateNewUser();
    
    usuario = dadosAleatorios.usuario;
    senha = dadosAleatorios.senha;
    nomeUsuario = dadosAleatorios.nomeUsuario;
});

// 3. Criar execução para antes de cada teste
test.beforeEach("Realizar login", async ({ page }) => {
    await page.goto("https://parabank.parasoft.com/parabank/index.htm");
    
    // Preenchendo os campos de login com os dados gerados no beforeAll
    await page.locator(".login").locator("[name='username']").fill(usuario);
    await page.locator(".login").locator("[name='password']").fill(senha);
    
    // Clicando no botão de Log In
    await page.getByRole("button", { name: "Log In" }).click();

    // Validando se o login foi efetuado com sucesso antes de prosseguir
    await expect(page.getByText("Welcome")).toBeVisible();
});

// Cenário de Teste Isolado
test("CT11 – Tentativa de Transferência com saldo insuficiente", async ({ page }) => {
    console.log(`Executando CT11 para o usuário: ${nomeUsuario}`);

    // Given que o usuário tenha acessado a funcionalidade "Transfer Funds"
    await page.getByRole("link", { name: "Transfer Funds" }).click();

    // Aguarda o carregamento das opções nos campos de seleção (Select)
    await page.waitForSelector("#fromAccountId option");
    await page.waitForSelector("#toAccountId option");

    // When informar um valor superior ao saldo disponível
    const valorAbsurdo = "9999999";
    await page.locator("#amount").fill(valorAbsurdo);

    // And selecionar uma conta de destino válida
    // Captura dinamicamente a primeira conta de origem disponível
    const contaOrigem = await page.locator("#fromAccountId").inputValue();
    await page.locator("#fromAccountId").selectOption(contaOrigem);
    
    // Captura dinamicamente a primeira conta de destino disponível
    const contaDestino = await page.locator("#toAccountId").inputValue();
    await page.locator("#toAccountId").selectOption(contaDestino);

    // And clicar no botão "TRANSFER"
    await page.getByRole("button", { name: "Transfer" }).click();

    // Then o sistema não deve processar a transferência
    // Garante que a mensagem de sucesso NÃO seja exibida
    await expect(page.getByText("Transfer Complete!")).not.toBeVisible();
    
    // And deve exibir uma mensagem de erro alertando que não há fundos suficientes
    const mensagemErro = page.locator(".error");
    await expect(mensagemErro).toBeVisible();
    await expect(mensagemErro).toContainText(/insufficient funds/i);
});