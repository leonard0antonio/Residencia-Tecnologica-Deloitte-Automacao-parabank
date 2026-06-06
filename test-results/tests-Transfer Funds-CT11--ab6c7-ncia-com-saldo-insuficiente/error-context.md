# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\Transfer Funds\CT11-Tentativa-de-Transferencia-com-saldo-insuficiente.spec.ts >> CT11 – Tentativa de Transferência com saldo insuficiente
- Location: tests\Transfer Funds\CT11-Tentativa-de-Transferencia-com-saldo-insuficiente.spec.ts:55:5

# Error details

```
Error: ⚠️ BUG ENCONTRADO: O sistema completou a transferência mesmo sem saldo suficiente.
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
        - paragraph [ref=e29]: Welcome Leon Zboncak
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
        - heading "Transfer Complete!" [level=1] [ref=e51]
        - paragraph [ref=e52]: "$9999999.00 has been transferred from account #34545 to account #34878."
        - paragraph [ref=e53]: See Account Activity for more details.
  - generic [ref=e55]:
    - list [ref=e56]:
      - listitem [ref=e57]:
        - link "Home" [ref=e58] [cursor=pointer]:
          - /url: index.htm
        - text: "|"
      - listitem [ref=e59]:
        - link "About Us" [ref=e60] [cursor=pointer]:
          - /url: about.htm
        - text: "|"
      - listitem [ref=e61]:
        - link "Services" [ref=e62] [cursor=pointer]:
          - /url: services.htm
        - text: "|"
      - listitem [ref=e63]:
        - link "Products" [ref=e64] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/products.jsp
        - text: "|"
      - listitem [ref=e65]:
        - link "Locations" [ref=e66] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - text: "|"
      - listitem [ref=e67]:
        - link "Forum" [ref=e68] [cursor=pointer]:
          - /url: http://forums.parasoft.com/
        - text: "|"
      - listitem [ref=e69]:
        - link "Site Map" [ref=e70] [cursor=pointer]:
          - /url: sitemap.htm
        - text: "|"
      - listitem [ref=e71]:
        - link "Contact Us" [ref=e72] [cursor=pointer]:
          - /url: contact.htm
    - paragraph [ref=e73]: © Parasoft. All rights reserved.
    - list [ref=e74]:
      - listitem [ref=e75]: "Visit us at:"
      - listitem [ref=e76]:
        - link "www.parasoft.com" [ref=e77] [cursor=pointer]:
          - /url: http://www.parasoft.com/
```

# Test source

```ts
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
  23  |     // Preenchendo o formulário de cadastro
  24  |     await page.locator("[id='customer\\.firstName']").fill(firstName);
  25  |     await page.locator("[id='customer\\.lastName']").fill(lastName);
  26  |     await page.locator("[id='customer\\.address\\.street']").fill("Rua QA 123");
  27  |     await page.locator("[id='customer\\.address\\.city']").fill("Recife");
  28  |     await page.locator("[id='customer\\.address\\.state']").fill("PE");
  29  |     await page.locator("[id='customer\\.address\\.zipCode']").fill("50000-000");
  30  |     await page.locator("[id='customer\\.phoneNumber']").fill("81999999999");
  31  |     await page.locator("[id='customer\\.ssn']").fill("000-00-0000");
  32  |     
  33  |     await page.locator("[id='customer\\.username']").fill(usuario);
  34  |     await page.locator("[id='customer\\.password']").fill(senha);
  35  |     await page.locator("#repeatedPassword").fill(senha);
  36  | 
  37  |     await page.getByRole("button", { name: "Register" }).click();
  38  |     await expect(page.getByText("Your account was created successfully")).toBeVisible();
  39  | 
  40  |     await page.close();
  41  | });
  42  | 
  43  | // 3. Criar execução para antes de cada teste
  44  | test.beforeEach("Realizar login", async ({ page }) => {
  45  |     await page.goto("https://parabank.parasoft.com/parabank/index.htm");
  46  |     
  47  |     await page.locator(".login").locator("[name='username']").fill(usuario);
  48  |     await page.locator(".login").locator("[name='password']").fill(senha);
  49  |     
  50  |     await page.getByRole("button", { name: "Log In" }).click();
  51  |     await expect(page.locator("#leftPanel")).toBeVisible();
  52  | });
  53  | 
  54  | // Cenário de Teste Isolado
  55  | test("CT11 – Tentativa de Transferência com saldo insuficiente", async ({ page }) => {
  56  |    console.log(`Executando CT11 para o usuário: ${nomeUsuario}`);
  57  |     console.log(`Usuário: ${usuario}`);
  58  |     console.log(`senha: ${senha}`);
  59  | 
  60  |     // --- PRÉ-REQUISITO: Abrir uma nova conta para ter um destino válido ---
  61  |     await page.getByRole("link", { name: "Open New Account" }).click();
  62  |     
  63  |     // Aguarda o Parabank carregar as opções no select
  64  |     await page.waitForSelector("#fromAccountId");
  65  |     
  66  |     // Captura o 'value' exato da primeira tag <option> disponível
  67  |     const primeiraContaOrigem = await page.locator("#fromAccountId option").first().getAttribute("value");
  68  |     
  69  |     // Seleciona a conta passando o valor real como parâmetro
  70  |     if (primeiraContaOrigem) {
  71  |         await page.locator("#fromAccountId").selectOption(primeiraContaOrigem);
  72  |     }
  73  |     
  74  |     // Clica no botão para abrir a conta
  75  |     await page.getByRole("button", { name: "Open New Account" }).click();
  76  |     
  77  |     // Valida que a conta foi aberta e captura o novo número da conta
  78  |     await expect(page.getByText("Account Opened!")).toBeVisible();
  79  |     const contaDestinoId = await page.locator("#newAccountId").textContent();
  80  |     console.log(`Nova conta de destino criada: ${contaDestinoId}`);
  81  |     // ----------------------------------------------------------------------
  82  | 
  83  |     // Given que o usuário tenha acessado a funcionalidade "Transfer Funds"
  84  |     await page.getByRole("link", { name: "Transfer Funds" }).click();
  85  | 
  86  |     // Aguarda o carregamento das opções nos campos de seleção
  87  |     await page.waitForSelector("#fromAccountId");
  88  |     await page.waitForSelector("#toAccountId");
  89  | 
  90  |     // When informar um valor superior ao saldo disponível
  91  |     const valorAbsurdo = "9999999";
  92  |     await page.locator("#amount").fill(valorAbsurdo);
  93  | 
  94  |     // And selecionar uma conta de destino válida (A conta que acabamos de criar!)
  95  |     if (contaDestinoId) {
  96  |         await page.locator("#toAccountId").selectOption(contaDestinoId);
  97  |     }
  98  | 
  99  |     // And clicar no botão "TRANSFER"
  100 |     await page.getByRole("button", { name: "Transfer" }).click();
  101 | 
  102 |     // Aguardamos 2 segundos para dar tempo de o sistema processar a transação
  103 |     await page.waitForTimeout(2000);
  104 | 
  105 |     // Verificamos se a mensagem de sucesso está na tela (retorna true ou false)
  106 |     const bugPresente = await page.getByText("Transfer Complete!").isVisible();
  107 | 
  108 |     if (bugPresente) {
  109 |         // O sistema permitiu a transferência sem saldo (Comportamento Real / Bug)
> 110 |         throw new Error("⚠️ BUG ENCONTRADO: O sistema completou a transferência mesmo sem saldo suficiente.");
      |               ^ Error: ⚠️ BUG ENCONTRADO: O sistema completou a transferência mesmo sem saldo suficiente.
  111 |     } else {
  112 |         // O sistema bloqueou a transferência corretamente (Comportamento Esperado)
  113 |         console.log("✅ SUCESSO NO TESTE: O sistema bloqueou a transferência sem saldo.");
  114 |         
  115 |         const mensagemErro = page.locator(".error");
  116 |         await expect(mensagemErro).toBeVisible();
  117 |         await expect(mensagemErro).toContainText(/insufficient funds/i);
  118 |     }
  119 | });
```