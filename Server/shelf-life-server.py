import socket

HOST = ""
PORT = 20500


class ShelfLifeServer:
    def __init__(self, host, port):    
        # Uses SOCK_STREAM to do TCP
        self.tcp_sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.tcp_sock.bind((host, port))

    def run_server(self):
        # Max number of clients
        self.tcp_sock.listen(20)
        
        while True:
            connection, address = self.tcp_sock.accept() # Accept connection from clients

            while True:
                try:
                    data = connection.recv(4096) # Get Raw Data
                except socket.error:                    
                    break                
                # Error Handling to ensure valid data
                if not data: # if there is no data                    
                    continue
                client_message = data.decode('ascii') # Assume encoded with ASCII
                print(client_message)
                response = "pong"
                connection.sendall(response.encode("ascii"))                



if __name__ == "__main__":
    server = ShelfLifeServer(HOST, PORT)
    server.run_server()