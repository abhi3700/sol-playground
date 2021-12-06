'''
	View decoded private key
		-  the format usually stored in `...id.json` file during generating a keypair.

'''
import base58

MY_PRIVATE_KEY_IN_BASE58 = "yiCUEF4v76inZBFXazYivLGsD33CUNiafA7yJAGGHbxjU52CuKGVr6WNGFivMhKmvA1bs8gtQsToSLCQAde4ysp"
byte_array = base58.b58decode(MY_PRIVATE_KEY_IN_BASE58)
json_string = "[" + ",".join(map(lambda b: str(b), byte_array)) + "]"
print(f'The decoded private key: \n{json_string}')