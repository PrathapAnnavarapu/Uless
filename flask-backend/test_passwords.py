import pymysql

users = ["root", "prathap"]
passwords = ["root", "prathap@178", "Prathap@178", "prathap", "", "root123", "password123"]

for u in users:
    for p in passwords:
        try:
            conn = pymysql.connect(host='localhost', user=u, password=p, database='uless_db')
            print(f"Success with user: {u}, password: {p}")
            conn.close()
            exit(0)
        except Exception as e:
            # print(f"Failed with user: {u}, password: {p} - {e}")
            pass
print("All combinations failed.")
