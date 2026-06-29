Feature: Ecommerce validations

    Scenario: : Placing the Order
        Given a login to Ecommerce applicatoin with "sriram.b.joshi@gmail.com" and "Adishankara123#"
        When Add "ZARA COAT 3" to cart
        Then Verfiy "ZARA COAT 3" is displayed in the cart
        When Enter valid details and Place the Order
        Then Verify order in present in the OrderHistory
