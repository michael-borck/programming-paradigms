def add(x, y):
    """Function to add two numbers."""
    return x + y

def subtract(x, y):
    """Function to subtract two numbers."""
    return x - y

def multiply(x, y):
    """Function to multiply two numbers."""
    return x * y

def divide(x, y):
    """Function to divide two numbers."""
    if y == 0:
        return "Cannot divide by zero"
    return x / y

def calculate(x, y, operation):
    """
    Perform a calculation based on the chosen operation.

    :param x: First operand
    :param y: Second operand
    :param operation: Chosen operation as a string ('1' to '4')
    :return: Result of the calculation
    """
    if operation == '1':
        return add(x, y)
    elif operation == '2':
        return subtract(x, y)
    elif operation == '3':
        return multiply(x, y)
    elif operation == '4':
        return divide(x, y)
    else:
        return "Invalid choice"

def read_input():
    """
    Read user input for the operation and operands.

    :return: Tuple containing the choice of operation, operands, and an error message
    """
    choice = input("Enter choice (1-4 or 'q' to quit): ")
    if choice == 'q':
        return choice, None, None
    if choice not in {'1', '2', '3', '4'}:
        return None, None, "Invalid choice. Please enter a number between 1-4 or 'q' to quit."

    try:
        x = float(input("Enter x: "))
        y = float(input("Enter y: "))
    except ValueError:
        return None, None, "Invalid input. Please enter a number."

    return choice, x, y

def print_output(result):
    """Print the result of a calculation."""
    print(result)

def main():
    """Main program to run the calculator."""
    while True:
        print("----------")
        print("1. Add\n2. Subtract\n3. Multiply\n4. Divide")
        print("----------")

        choice, x, y = read_input()

        if choice == 'q':
            break

        result = calculate(x, y, choice)
        print_output(result)

    print("Goodbye")

if __name__ == "__main__":
    main()