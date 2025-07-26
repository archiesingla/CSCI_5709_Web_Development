import re

def validate_data(data):
    # regex patterns 
    name_pattern = r"^[\w\s\-\',.@:!#&()]{2,100}$"
    price_pattern = r"^\d{1,3}(,\d{3})*(\.\d{1,2})?$|^\d+(\.\d{1,2})?$"
    description_pattern = r"^[A-Za-z\s]{2,50}$"

    fields = ["name", "description", "price", "id"]
    for field in fields:
        if field not in data:
            return False
    
    if not re.fullmatch(name_pattern, str(data[fields[0]])):
        return False, "Product name must be 2–100 characters, letters, numbers, (-), ('), commas, periods"
    
    if not re.fullmatch(description_pattern, str(data[fields[1]])):
        return False, "Description must be 2–50 characters long and can include letters, numbers, spaces, and common symbols."
    
    if not re.fullmatch(price_pattern, str(data[fields[2]])):
        return False, "Price must be a valid number, optionally using commas (e.g., 1,000.99)"

    return True, None