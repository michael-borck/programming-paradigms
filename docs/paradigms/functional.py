"""
4-Function Calculator the Functional Programming Way

This program demonstrates concepts of functional programming, including pure functions, higher-order functions,
immutable data, and first-class citizens. It provides basic arithmetic operations through a menu-driven interface.

- Pure functions are used wherever possible for predictable behavior and lack of side effects.
- Higher-order functions enable passing functions as arguments for abstraction.
- Recursion is used instead of loops in some cases.
- Some impure functions are necessary for I/O operations like print and input.

Concepts:

- Pure functions: Functions that always produce the same output for the same input and have no side effects.
- First-class citizens: Functions can be treated as values, passed as arguments, and returned from other functions.
- Immutable data: Data that cannot be changed after creation, ensuring predictability and avoiding side effects.
- Higher-order functions: Functions that take one or more functions as arguments and/or return a function.
- Recursion: A function that calls itself, often used instead of loops in functional programming.

I dont understand Functional Programming

If you find yourself having trouble fully grasping the 4-function calculator
example written in a functional programming style, don't worry too much. The
key concepts to focus on are immutability and pure functions. Understanding
these principles can be more valuable than mastering the entire functional
paradigm, especially if you are working mainly in an imperative context.
Applying the principles of immutability and pure functions in your code can
lead to several benefits, including easier testing, increased maintainability,
and enhanced readability. Even if the functional style seems abstract or
unfamiliar, these core ideas are transferable and can greatly improve the
quality and robustness of your code, no matter the programming paradigm you
"""

def add(x, y):
  """
  A pure function to add two numbers.
  
  :param x: First operand
  :param y: Second operand
  :return: Sum of x and y
  """
  return x + y

def subtract(x, y):
  """
  A pure function to subtract two numbers.
  
  :param x: First operand
  :param y: Second operand
  :return: Difference of x and y
  """
  return x - y

def multiply(x, y):
  """
  A pure function to multiply two numbers.
  
  :param x: First operand
  :param y: Second operand
  :return: Product of x and y
  """
  return x * y

def divide(x, y):
  """
  A pure function to divide two numbers.
  
  :param x: Dividend
  :param y: Divisor
  :return: Quotient of x and y
  """
  if y == 0:
    return "Cannot divide by zero"
  return x / y

# General calculation function
def calculate(x, y, func):
  """
  A higher-order function that takes a function as an 
  argument to perform calculation.
  
  :param x: First operand
  :param y: Second operand
  :param func: Function to apply
  :return: Result of applying func to x and y
  """
  return func(x, y) # Example of Functions as First class citizens

MENU = "----------\n1. Add\n2. Subtract\n3. Multiply\n4. Divide\n----------"

# This dictionary shows that functions are treated as 
# first-class citizens, and we can store them in data structures.
operators = {
  '1': add,
  '2': subtract,
  '3': multiply,
  '4': divide
}


def get_operation_func(choice):
  if choice not in operators:
    return None, "Invalid choice"
  return operators[choice], None


def read_input():
    """
    An impure function to read user input with validation.

    :return: Tuple containing the choice of operation, operands, and error message
    """
    choice = input("Enter choice (1-4 or 'q' to quit): ")
    if choice == 'q':
        return choice, None, None, None
    if choice not in operators:
        return None, None, None, "Invalid choice. Please enter a number between 1-4 or 'q' to quit."

    try:
        x = float(input("Enter x: "))
        y = float(input("Enter y: "))
    except ValueError:
        return None, None, None, "Invalid input. Please enter a number."

    return choice, x, y, None

def print_output(result):
  """
  An impure function to print the result.
  
  :param result: Result to print
  """
  print(result)

def update_history(history, result):
  """
  A function using immutable data by returning a new tuple 
  containing the previous history and new result.

  Note this function is not stirctly necessary, but is
  include to give an idea how you might maintain a history
   of transaction etc.
  
  :param history: Tuple containing previous results
  :param result: New result to append
  :return: New tuple containing the updated history
  """
  return history + (result,) # Example of Immutable data

def repl(history):
  """
  A recursive function to handle the read-eval-print loop.
  
  :param history: Tuple containing previous results
  :return: Boolean indicating whether to quit
  """
  print(MENU)
  choice, x, y, error = read_input()
  if error:
    print(error)
    return repl(history)

  if choice == 'q':
    return True

  operation_func, error = get_operation_func(choice)
  if error:
    print(error)
    return repl(history)
  
  result = calculate(x, y, operation_func) # Example of Higher Order Function
  print_output(result)
  new_history = update_history(history, result) # Recursion used here
  quit_signal = repl(new_history)
  return quit_signal if not quit_signal else True

def main():
  # Initialize and start calculator
  initial_history = () # Example of Immutable data
  repl(initial_history)
  print("Goodbye")

if __name__ == "__main__":
  main()
