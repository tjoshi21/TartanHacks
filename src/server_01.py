from flask import Flask, g, request, render_template,\
                  redirect, url_for,session ,json  

from flask.ext.login import LoginManager, UserMixin, \
                                login_required, login_user, logout_user                   
  
#config  
app = Flask(__name__)
app.config.from_object('config')
             
#flask-login
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"

     
class User(UserMixin):

    def __init__(self, id):
        self.id = id
        self.name = "user" + str(id)
        self.password = self.name + "_secret"
        
    def __repr__(self):
        return "%d/%s/%s" % (self.id, self.name, self.password)
     
# make some dummy users
users = [User(id) for id in range(1, 21)]     
     
@login_manager.user_loader
def load_user(userid):
    return User(userid)     
     
#server routes
@app.route('/homepage/<andrewid>',methods=['GET','POST'])
@login_required
def homepage(andrewid):
    return render_template('homepage.html')

    

@app.route('/',methods=['GET','POST'])
@app.route('/login',methods=['GET','POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']        
        if password == username + "_secret":
            id = username.split('user')[1]
            user = User(id)
            login_user(user)
            
            next = flask.request.args.get('next')
            if not is_safe_url(next):
                return flask.abort(400)
            return redirect(next or flask.url_for('homepage',andrewid=username))
        else:   
            return render_template('login.html') 
    return render_template('login.html')   

@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for('login.html'))

#launch the server
app.secret_key = 'the mac address is....'   

if __name__ == '__main__':
    
    app.run(debug = True)