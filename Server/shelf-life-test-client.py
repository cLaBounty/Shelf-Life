import socket
import sys

# Set these values to match the hostname and port of your server
HOST = "184.171.155.35"
PORT = 20500

# Create a TCP/IP socket
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Connect the socket to the port where the server is listening
server_address = (HOST, PORT)
print(f'connecting to {server_address}')
sock.connect(server_address)

test_string = "ping"
sock.sendall(test_string.encode("ascii"))
response_string = sock.recv(4096)
print(response_string.decode('ascii'))
sock.close()