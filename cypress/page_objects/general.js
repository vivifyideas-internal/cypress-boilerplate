class General{
    clickElement(element, force) {
        if(force) {
            cy.getElement(element).click({force:true}) 

            return 
        } 
        cy.getElement(element).click() 
    } 

    type(selector, text, clearInput) {
        if(clearInput) {
            cy.getElement(selector).clear().type(text) 

            return 
        }
        cy.getElement(selector).type(text)  
    } 

    checkClass(element, className, isClassPresent) {
        cy.getElement(element)
          .invoke('attr', 'class')
          .should(isClassPresent ? 'contain' : 'not.contain', className)
    } 

    expectValue(element, expectedValue, isExpect) {
        cy.getElement(element).then(($value) => {
            return isExpect ? 
                cy.expect($value.text()).to.equal(expectedValue):
                cy.expect($value.text()).to.not.equal(expectedValue)
        })
    }

    expectInputValue(input, value) {
        cy.getElement(input).should('have.value', value)
    }

    visitTab(tab, expectedUrl) {
        this.clickElement(tab) 
        this.urlInclude(expectedUrl) 
    }

    urlInclude(expectedUrl) {
        cy.url().should('include', expectedUrl) 
    }

    checkElementPresence(element, shouldBePresent) {
        shouldBePresent ? cy.get(element).should('exist') : cy.get(element).should('not.exist')
    }

    checkMultipleElementsPresence(elements, shouldBePresent) {
        elements.forEach(element => this.checkElementPresence(element, shouldBePresent))
    }

    checkElementFocused(element) {
        cy.getElement(element).should('have.focus') 
    }

    pressKey(element, action, key, code, which) {
        cy.getElement(element).focus().trigger(action, { key: key, code: code, which: which})  
    }

    checkContainedData(element, data) {
        for(let i = 0; i < data.length; i++) {
            cy.getElement(element).should('contain', data[i]) 
        }
    }

    checkChildrenNumber(element, expectedChildrenNumber) {
        cy.getElement(element).children().should('have.length', expectedChildrenNumber)
    }
}
export const general = new General() 