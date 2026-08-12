class Calculator:
    """
    Encapsulates the calculator's state and behaviour.

    The history list is internal state: every method call mutates the
    object by appending to it. This is the heart of the object-oriented
    paradigm — data and the operations on that data travel together.
    """

    def __init__(self):
        self.history = []

    def add(self, x, y):
        result = x + y
        self.history.append(("add", x, y, result))
        return result

    def subtract(self, x, y):
        result = x - y
        self.history.append(("subtract", x, y, result))
        return result

    def multiply(self, x, y):
        result = x * y
        self.history.append(("multiply", x, y, result))
        return result

    def divide(self, x, y):
        if y == 0:
            return "Cannot divide by zero"
        result = x / y
        self.history.append(("divide", x, y, result))
        return result

    def print_history(self):
        for operation, x, y, result in self.history:
            print(f"{operation}({x}, {y}) = {result}")


class Menu:
    """Responsible only for interacting with the user."""

    def __init__(self):
        self.options = {
            "1": "Add",
            "2": "Subtract",
            "3": "Multiply",
            "4": "Divide"
        }

    def print_menu(self):
        print("----------")
        for key, option in self.options.items():
            print(f"{key}. {option}")
        print("----------")

    def get_input(self):
        choice = input("Enter choice (1-4 or 'q' to quit): ")
        if choice == 'q':
            return choice, None, None
        if choice not in self.options:
            print("Invalid choice. Please enter a number between 1-4 or 'q' to quit.")
            return None, None, None
        try:
            x = float(input("Enter x: "))
            y = float(input("Enter y: "))
        except ValueError:
            print("Invalid input. Please enter a number.")
            return None, None, None
        return choice, x, y


def main():
    menu = Menu()
    calculator = Calculator()

    while True:
        menu.print_menu()
        choice, x, y = menu.get_input()

        if choice == 'q':
            break
        if choice is None:
            continue

        if choice == '1':
            result = calculator.add(x, y)
        elif choice == '2':
            result = calculator.subtract(x, y)
        elif choice == '3':
            result = calculator.multiply(x, y)
        elif choice == '4':
            result = calculator.divide(x, y)

        print(result)

    print("Goodbye")
    calculator.print_history()


if __name__ == "__main__":
    main()
