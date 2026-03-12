import {test, expect, chromium} from "@playwright/test"
import { log } from "console"
import { loadavg } from "os"

import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [['html', { open: 'never' }]]
});


  const obj : { [key:string] : string | number } = { }

  test('Table&pagination', async({page})=>
    
    
    {
    
    await page.goto("https://playwright-mastery-academy-app.vercel.app/practice/table-pagination")

    await page.getByTestId('filter-role').selectOption("QA Engineer")

    await page.getByTestId('filter-status').selectOption('Placed')

    //const headers = await page.getByRole("columnheader", {name:"ID"}).textContent()

    //console.log(headers);

    await page.waitForTimeout(5000)

    const headers = await page.locator('tr th').allTextContents() 
    
    const paging = await page.getByTestId('pagination-current').textContent() || " "

    const tmp = paging.split(' ')
    
    
    
    for (let k = 0 ; k < Number(tmp[3]); k++){

      const count = await page.locator('tbody tr').count()

     
       
      for (let j=0; j < count ; j++)
      { 
            
          const rowdata = await page.locator('tbody tr').nth(j)
    
          const singledata = await rowdata.locator('td').allInnerTexts()

          
          for(let i=0;i<headers.length;i++)
              {
    
                 const objkey = headers[i]

                 obj[objkey] = singledata[i]

              }

              console.log(obj);
      } 
             
                if (k< Number(tmp[3])-1)
                   {   
                   
                    await page.getByTestId('pagination-next').click()
          
                   }
                    
           
        }
      
  })

  
