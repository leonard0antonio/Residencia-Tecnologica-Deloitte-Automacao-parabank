# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\Transfer Funds\CT13-Tentativa-de-transferência-para-o-mesma-conta.spec.ts >> CT13 - Tentativa de transferência para a mesma conta
- Location: tests\Transfer Funds\CT13-Tentativa-de-transferência-para-o-mesma-conta.spec.ts:55:5

# Error details

```
Error: ⚠️ BUG ENCONTRADO: O sistema permitiu uma transferência para a própria conta de origem.
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
        - paragraph [ref=e29]: Welcome Moses Frami
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
        - paragraph [ref=e52]: "$9999999.00 has been transferred from account #34656 to account #34656."
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
  55  | test("CT13 - Tentativa de transferência para a mesma conta", async ({ page }) => {
  56  |     console.log(`Executando CT13 para o usuário: ${nomeUsuario}`);
  57  |     console.log(`Usuário: ${usuario}`);
  58  |     console.log(`senha: ${senha}`);
  59  | 
  60  |     // 1. Given que o usuário esteja na funcionalidade "Transfer Funds"
  61  |     await page.getByRole("link", { name: "Transfer Funds" }).click();
  62  | 
  63  |     // Aguarda o carregamento das opções nos campos de seleção
  64  |     await page.waitForSelector("#fromAccountId");
  65  | 
  66  | // 2. When selecionar a exata mesma conta nos campos "From account" e "To account"
  67  |     
  68  |     // Aguarda o Parabank carregar a tag <option> no código (mesmo que invisível na tela)
  69  |     await page.waitForSelector("#fromAccountId option", { state: 'attached' });
  70  | 
  71  |     // Pausa de 1 segundo para garantir que o número da conta foi totalmente processado
  72  |     await page.waitForTimeout(1000);
  73  | 
  74  |     // Captura diretamente o atributo 'value' da primeira opção (mesmo oculta)
  75  |     const contaUnica = await page.locator("#fromAccountId option").first().getAttribute("value");
  76  | 
  77  |     if (contaUnica) {
  78  |         console.log(`Usando a conta ${contaUnica} para Origem e Destino.`);
  79  |         
  80  |         // Seleciona a exata mesma conta nos dois campos
  81  |         await page.locator("#fromAccountId").selectOption(contaUnica);
  82  |         await page.locator("#toAccountId").selectOption(contaUnica);
  83  |     } else {
  84  |         console.error("❌ ERRO: Não foi possível capturar o número da conta para o teste.");
  85  |         return; // Encerra o teste se não conseguir obter a conta
  86  |     }
  87  | 
  88  |     // 3. And informar um valor numérico para a transferência
  89  |     const valorAbsurdo = "9999999";
  90  |     await page.locator("#amount").fill(valorAbsurdo);
  91  | 
  92  |     // 4. And clicar no botão "TRANSFER"
  93  |     await page.getByRole("button", { name: "Transfer" }).click();
  94  | 
  95  |     // Aguardamos um pouco para a requisição finalizar
  96  |     await page.waitForTimeout(2000);
  97  | 
  98  |     // 5. Then o sistema não deve processar a operação
  99  |     // 6. And deve alertar o usuário de que a conta de destino não pode ser a mesma
  100 |     
  101 |     // Verificamos se a mensagem de sucesso indevida apareceu
  102 |     const bugPresente = await page.getByText("Transfer Complete!").isVisible();
  103 | 
  104 |     if (bugPresente) {
  105 |         // Comportamento falho do sistema
> 106 |         throw new Error("⚠️ BUG ENCONTRADO: O sistema permitiu uma transferência para a própria conta de origem.");
      |               ^ Error: ⚠️ BUG ENCONTRADO: O sistema permitiu uma transferência para a própria conta de origem.
  107 |     } else {
  108 |         // Comportamento correto do sistema (se um dia corrigirem o Parabank)
  109 |         console.log("✅ SUCESSO NO TESTE: O sistema bloqueou a transferência para a mesma conta.");
  110 |         const mensagemErro = page.locator(".error");
  111 |         await expect(mensagemErro).toBeVisible();
  112 |         // Espera genérica por uma mensagem de erro indicando problema na seleção das contas
  113 |         await expect(mensagemErro).not.toBeEmpty(); 
  114 |     }
  115 | });
```