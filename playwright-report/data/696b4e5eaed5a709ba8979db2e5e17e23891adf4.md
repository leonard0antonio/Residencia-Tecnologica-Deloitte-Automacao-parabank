# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\Request Loan\CT15-Tentativa-de-empréstimo-com-valor-de-entrada-superior-ao-empréstimo.spec.ts >> CT15 - Tentativa de empréstimo com valor de entrada superior ao empréstimo
- Location: tests\Request Loan\CT15-Tentativa-de-empréstimo-com-valor-de-entrada-superior-ao-empréstimo.spec.ts:52:5

# Error details

```
Error: ⚠️ BUG ENCONTRADO: O sistema aceitou e processou o formulário mesmo com a entrada sendo 5x maior que o empréstimo.
Status incorreto retornado pelo sistema: Approved
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - generic [ref=e3]:
      - link:
        - /url: admin.htm
        - img [ref=e4] [cursor=pointer]
      - link "ParaBank":
        - /url: index.htm
        - img "ParaBank" [ref=e5] [cursor=pointer]
      - paragraph [ref=e6]: Experience the difference
    - generic [ref=e7]:
      - list [ref=e8]:
        - listitem [ref=e9]: Solutions
        - listitem [ref=e10]:
          - link "About Us" [ref=e11] [cursor=pointer]:
            - /url: about.htm
        - listitem [ref=e12]:
          - link "Services" [ref=e13] [cursor=pointer]:
            - /url: services.htm
        - listitem [ref=e14]:
          - link "Products" [ref=e15] [cursor=pointer]:
            - /url: http://www.parasoft.com/jsp/products.jsp
        - listitem [ref=e16]:
          - link "Locations" [ref=e17] [cursor=pointer]:
            - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - listitem [ref=e18]:
          - link "Admin Page" [ref=e19] [cursor=pointer]:
            - /url: admin.htm
      - list [ref=e20]:
        - listitem [ref=e21]:
          - link "home" [ref=e22] [cursor=pointer]:
            - /url: index.htm
        - listitem [ref=e23]:
          - link "about" [ref=e24] [cursor=pointer]:
            - /url: about.htm
        - listitem [ref=e25]:
          - link "contact" [ref=e26] [cursor=pointer]:
            - /url: contact.htm
    - generic [ref=e27]:
      - generic [ref=e28]:
        - paragraph [ref=e29]: Welcome Francesca Parker
        - heading "Account Services" [level=2] [ref=e30]
        - list [ref=e31]:
          - listitem [ref=e32]:
            - link "Open New Account" [ref=e33] [cursor=pointer]:
              - /url: openaccount.htm
          - listitem [ref=e34]:
            - link "Accounts Overview" [ref=e35] [cursor=pointer]:
              - /url: overview.htm
          - listitem [ref=e36]:
            - link "Transfer Funds" [ref=e37] [cursor=pointer]:
              - /url: transfer.htm
          - listitem [ref=e38]:
            - link "Bill Pay" [ref=e39] [cursor=pointer]:
              - /url: billpay.htm
          - listitem [ref=e40]:
            - link "Find Transactions" [ref=e41] [cursor=pointer]:
              - /url: findtrans.htm
          - listitem [ref=e42]:
            - link "Update Contact Info" [ref=e43] [cursor=pointer]:
              - /url: updateprofile.htm
          - listitem [ref=e44]:
            - link "Request Loan" [ref=e45] [cursor=pointer]:
              - /url: requestloan.htm
          - listitem [ref=e46]:
            - link "Log Out" [ref=e47] [cursor=pointer]:
              - /url: logout.htm
      - generic [ref=e50]:
        - heading "Loan Request Processed" [level=1] [ref=e51]
        - table [ref=e52]:
          - rowgroup [ref=e53]:
            - 'row "Loan Provider: Wealth Securities Dynamic Loans (WSDL)" [ref=e54]':
              - cell "Loan Provider:" [ref=e55]
              - cell "Wealth Securities Dynamic Loans (WSDL)" [ref=e56]
            - 'row "Date: 06-5-2026" [ref=e57]':
              - cell "Date:" [ref=e58]
              - cell "06-5-2026" [ref=e59]
            - 'row "Status: Approved" [ref=e60]':
              - cell "Status:" [ref=e61]
              - cell "Approved" [ref=e62]
        - generic [ref=e63]:
          - paragraph [ref=e64]: Congratulations, your loan has been approved.
          - paragraph [ref=e65]:
            - text: "Your new account number:"
            - link "34101" [ref=e66] [cursor=pointer]:
              - /url: /parabank/activity.htm?id=34101
  - generic [ref=e68]:
    - list [ref=e69]:
      - listitem [ref=e70]:
        - link "Home" [ref=e71] [cursor=pointer]:
          - /url: index.htm
        - text: "|"
      - listitem [ref=e72]:
        - link "About Us" [ref=e73] [cursor=pointer]:
          - /url: about.htm
        - text: "|"
      - listitem [ref=e74]:
        - link "Services" [ref=e75] [cursor=pointer]:
          - /url: services.htm
        - text: "|"
      - listitem [ref=e76]:
        - link "Products" [ref=e77] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/products.jsp
        - text: "|"
      - listitem [ref=e78]:
        - link "Locations" [ref=e79] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - text: "|"
      - listitem [ref=e80]:
        - link "Forum" [ref=e81] [cursor=pointer]:
          - /url: http://forums.parasoft.com/
        - text: "|"
      - listitem [ref=e82]:
        - link "Site Map" [ref=e83] [cursor=pointer]:
          - /url: sitemap.htm
        - text: "|"
      - listitem [ref=e84]:
        - link "Contact Us" [ref=e85] [cursor=pointer]:
          - /url: contact.htm
    - paragraph [ref=e86]: © Parasoft. All rights reserved.
    - list [ref=e87]:
      - listitem [ref=e88]: "Visit us at:"
      - listitem [ref=e89]:
        - link "www.parasoft.com" [ref=e90] [cursor=pointer]:
          - /url: http://www.parasoft.com/
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import { generateNewUser } from '../../utils/generateUser';
  3   | 
  4   | // Variáveis de escopo do arquivo
  5   | let usuario: string;  
  6   | let senha: string;
  7   | let nomeUsuario: string;
  8   | let firstName: string;
  9   | let lastName: string;
  10  | 
  11  | test.beforeAll("Registrar dados do usuário no Parabank", async ({ browser }) => {
  12  |     const dadosAleatorios = generateNewUser();
  13  |     
  14  |     usuario = dadosAleatorios.usuario;
  15  |     senha = dadosAleatorios.senha;
  16  |     nomeUsuario = dadosAleatorios.nomeUsuario;
  17  |     firstName = dadosAleatorios.firstName;
  18  |     lastName = dadosAleatorios.lastName;
  19  | 
  20  |     const page = await browser.newPage();
  21  |     await page.goto("https://parabank.parasoft.com/parabank/register.htm");
  22  | 
  23  |     await page.locator("[id='customer\\.firstName']").fill(firstName);
  24  |     await page.locator("[id='customer\\.lastName']").fill(lastName);
  25  |     await page.locator("[id='customer\\.address\\.street']").fill("Rua QA 123");
  26  |     await page.locator("[id='customer\\.address\\.city']").fill("Recife");
  27  |     await page.locator("[id='customer\\.address\\.state']").fill("PE");
  28  |     await page.locator("[id='customer\\.address\\.zipCode']").fill("50000-000");
  29  |     await page.locator("[id='customer\\.phoneNumber']").fill("81999999999");
  30  |     await page.locator("[id='customer\\.ssn']").fill("000-00-0000");
  31  |     
  32  |     await page.locator("[id='customer\\.username']").fill(usuario);
  33  |     await page.locator("[id='customer\\.password']").fill(senha);
  34  |     await page.locator("#repeatedPassword").fill(senha);
  35  | 
  36  |     await page.getByRole("button", { name: "Register" }).click();
  37  |     await expect(page.getByText("Your account was created successfully")).toBeVisible();
  38  | 
  39  |     await page.close();
  40  | });
  41  | 
  42  | test.beforeEach("Realizar login", async ({ page }) => {
  43  |     await page.goto("https://parabank.parasoft.com/parabank/index.htm");
  44  |     
  45  |     await page.locator(".login").locator("[name='username']").fill(usuario);
  46  |     await page.locator(".login").locator("[name='password']").fill(senha);
  47  |     
  48  |     await page.getByRole("button", { name: "Log In" }).click();
  49  |     await expect(page.locator("#leftPanel")).toBeVisible();
  50  | });
  51  | 
  52  | test("CT15 - Tentativa de empréstimo com valor de entrada superior ao empréstimo", async ({ page }) => {
  53  |     console.log(`Executando CT15 para o usuário: ${nomeUsuario}`);
  54  |     console.log(`Usuário: ${usuario}`);
  55  |     console.log(`senha: ${senha}`);
  56  | 
  57  |     // 1. Given que o usuário esteja na funcionalidade "Apply for a Loan"
  58  |     await page.getByRole("link", { name: "Request Loan" }).click();
  59  | 
  60  |     // 2. When preencher o campo "Loan Amount" com um valor financeiro
  61  |     const valorEmprestimo = "100";
  62  |     await page.locator("#amount").fill(valorEmprestimo);
  63  | 
  64  |     // 3. And preencher o campo "Down Payment" com um valor superior ao valor solicitado
  65  |     const valorEntrada = "500";
  66  |     await page.locator("#downPayment").fill(valorEntrada);
  67  | 
  68  |     // 4. And selecionar a conta de origem e clicar no botão "Apply Now"
  69  |     // Espera a opção de conta aparecer usando a técnica do 'attached' para evitar timeout
  70  |     await page.waitForSelector("#fromAccountId option", { state: 'attached' });
  71  |     await page.waitForTimeout(1000);
  72  | 
  73  |     const contaOrigem = await page.locator("#fromAccountId option").first().getAttribute("value");
  74  |     if (contaOrigem) {
  75  |         await page.locator("#fromAccountId").selectOption(contaOrigem);
  76  |     }
  77  | 
  78  |     await page.getByRole("button", { name: "Apply Now" }).click();
  79  | 
  80  |     // Pausa para aguardar o processamento da requisição
  81  |     await page.waitForTimeout(2000);
  82  | 
  83  |     // 5. Then o sistema deve avaliar as regras de negócio e rejeitar a solicitação
  84  |     // 6. And exibir um aviso de que a entrada não pode ser superior ao valor do empréstimo solicitado.
  85  | 
  86  |     // Diagnóstico do comportamento do Parabank:
  87  |     // O correto seria o formulário exibir um erro e NÃO levar para a tela de "Loan Request Processed".
  88  |     const bugPresente = await page.getByText("Loan Request Processed").isVisible();
  89  | 
  90  |     if (bugPresente) {
  91  |         // Verifica qual foi o status final que o sistema deu para essa transação bizarra
  92  |         const statusEmprestimo = await page.locator("#loanStatus").textContent();
> 93  |         throw new Error(`⚠️ BUG ENCONTRADO: O sistema aceitou e processou o formulário mesmo com a entrada sendo 5x maior que o empréstimo.\nStatus incorreto retornado pelo sistema: ${statusEmprestimo}`);
      |               ^ Error: ⚠️ BUG ENCONTRADO: O sistema aceitou e processou o formulário mesmo com a entrada sendo 5x maior que o empréstimo.
  94  |     } else {
  95  |         console.log("✅ SUCESSO NO TESTE: O sistema bloqueou a solicitação na mesma tela.");
  96  |         
  97  |         // Se um dia o Parabank for corrigido, ele deve exibir uma mensagem de erro na própria tela.
  98  |         // O seletor abaixo é genérico para capturar mensagens de erro (classe .error ou id específico)
  99  |         const mensagemErro = page.locator(".error");
  100 |         await expect(mensagemErro).toBeVisible();
  101 |         await expect(mensagemErro).not.toBeEmpty();
  102 |     }
  103 | });
```