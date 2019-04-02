Feature: Github search
  Scenario: Search

    Given github page is displayed
    When  user search "fralvarop/testcafe-cucumberjs"
    Then  one result is shown