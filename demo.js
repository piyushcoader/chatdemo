messeges=new Mongo.Collection('msg');
Meteor.methods({
	insert:function(msg){
		//
		msg.createdAt=new Date();
		return messeges.insert(msg);
	}
});
if(Meteor.isClient){
	Meteor.subscribe('getMessege');
  console.log('from client');
	Template.chats.helpers({
		recentMessages:function(){
			return messeges.find({})
		}
	});
	Template.chats.events({
		'submit #chat-box':function(e,t){
			e.preventDefault();
			var msg={
				username:Meteor.user().username,
				text: t.find('.txt-msg').value
			};
			Meteor.call('insert',msg,function(err,res){
				if(!err)
					t.find('.txt-msg').value=null;
			});
		}
	});
	Accounts.ui.config({
		passwordSignupFields:'USERNAME_ONLY'
	})
}
if(Meteor.isServer){
  console.log('server');
	Meteor.publish('getMessege',function(){
		//
		return messeges.find({},{sort:{createdAt:-1},limit:5});
	});
}