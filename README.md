# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation
##usersテーブル
|Column|Type|Optiions|
|------|----|--------|
|name|string|null:false,index:true|

### Association
has_many :user_groups
has_many :groups through: :user_groups
has_many :messages


##groupsテーブル
|Column|Type|Optiions|
|------|----|--------|
|name|string|null:false|


### Association
has_many :user_groups
has_many :users through: :user_groups
has_many :messages


##messagesテーブル
|Column|Type|Optiions|
|------|----|--------|
|text|text||
|image|string||
|user|references|null:false,foreign_key:true|
|group|references|null:false,foreign_key:true|

### Association
belongs_to :user
belongs_to :group

##user_groupsテーブル
|Column|Type|Optiions|
|------|----|--------|
|user|references|null:false,foreign_key:true|
|group|references|null:false,foreign_key:true|

### Association
belongs_to :user
belongs_to :group


* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
