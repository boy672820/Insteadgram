import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Icon, Container, Content, Header, Left, Body, Right, Button } from 'native-base';
import EntypoIcon from 'react-native-vector-icons/Entypo';

const { width, height } = Dimensions.get( 'window' );

let images = [
	"https://cdn.pixabay.com/photo/2018/11/29/21/19/hamburg-3846525__480.jpg",
	"https://cdn.pixabay.com/photo/2018/11/11/16/51/ibis-3809147__480.jpg",
	"https://cdn.pixabay.com/photo/2018/11/23/14/19/forest-3833973__480.jpg",
	"https://cdn.pixabay.com/photo/2019/01/05/17/05/man-3915438__480.jpg",
	"https://cdn.pixabay.com/photo/2018/12/04/22/38/road-3856796__480.jpg",
	"https://cdn.pixabay.com/photo/2018/11/04/20/21/harley-davidson-3794909__480.jpg",
	"https://cdn.pixabay.com/photo/2018/12/25/21/45/crystal-ball-photography-3894871__480.jpg",
	"https://cdn.pixabay.com/photo/2018/12/29/23/49/rays-3902368__480.jpg",
	"https://cdn.pixabay.com/photo/2017/05/05/16/57/buzzard-2287699__480.jpg",
	"https://cdn.pixabay.com/photo/2018/08/06/16/30/mushroom-3587888__480.jpg",
	"https://cdn.pixabay.com/photo/2018/12/15/02/53/flower-3876195__480.jpg",
	"https://cdn.pixabay.com/photo/2018/12/16/18/12/open-fire-3879031__480.jpg",
	"https://cdn.pixabay.com/photo/2018/11/24/02/05/lichterkette-3834926__480.jpg",
	"https://cdn.pixabay.com/photo/2018/11/29/19/29/autumn-3846345__480.jpg"
];

export default class ProfileTab extends Component {
	static navigationOptions = {
		tabBarIcon: ( { tintColor } ) => (
			<Icon name='person' style={ { color: tintColor } } />
		)
	};

	state = {
		name: '',
		reputation: 0,
		profile: {},
		postCount: 0,
		followingCount: 0,
		followerCount: 0,
		activeIndex: 0,
		blogs: []
	};

	renderSection() {
		if ( this.state.activeIndex === 0 ) {
			return (
				<View style={ { flexDirection: 'row', flexWrap: 'wrap' } }>
					{ this.renderSectionOne() }
				</View>
			)
		}
	}

	renderSectionOne() {
		return images.map( ( image, index ) => {
			return (
				<View key={ index }
					style={ { width: width/3, height: width/3 } }>
					<Image source={ { url: image } } style={ { flex: 1 } } />
				</View>
			)
		} );
	}

	segmentClicked( index ) {
		this.setState( {
			activeIndex: index
		} );
	}

	fetchAccount( username ) {
		const data = {
			id: 3,
			jsonrpc: '2.0',
			method: 'call',
			params: [
				'database_api',
				'get_accounts',
				[ [ username ] ]
			]
		};

		return fetch( 'https://api.steemit.com', {
			method: 'POST',
			body: JSON.stringify( data )
		} )
		.then( res => res.json() )
		.then( res => res.result[ 0 ] );
	}

	fetchFollowCount( username ) {
		const data = {
			id: 3,
			jsonrpc: '2.0',
			method: 'call',
			params: [
				'follow_api',
				'get_follow_count',
				[ username ]
			]
		};

		return fetch( 'https://api.steemit.com', {
			method: 'POST',
			body: JSON.stringify( data )
		} )
		.then( res => res.json() )
		.then( res => res.result )
		.catch( ( error ) => { console.error( error ) } );
	}

	componentWillMount() {
		const username = 'anpigon';

		this.fetchAccount( username ).then( ( { name, post_count, reputation, json_metadata } ) => {
			const { profile } = JSON.parse( json_metadata );
			const log = Math.log( parseInt( reputation.substring( 0, 4 ) ) ) / Math.log( 10 );
			this.setState( {
				name,
				reputation: Math.max( reputation.length - 1 + log - parseInt( log ) - 9, 0 ) * 9 + 25, // Calculates reputation degree
				postCount: post_count, // Post count
				profile // Profile information
			} );
		} );

		this.fetchFollowCount( username ).then( ( { following_count, follower_count } ) => {
			this.setState( {
				followingCount: following_count, // Following count
				followerCount: follower_count // Follower count
			} );
		} );
	}

	render() {
		const {
			name,
			reputation,
			profile,
			postCount,
			followingCount,
			followerCount
		} = this.state;

		return (
			<Container style={ { flex:1, backgroundColor: 'white' } }>
				<Header>
					<Left><Icon name="md-person-add" style={ { paddingLeft:10 } } /></Left>
					<Body><Text>{name}</Text></Body>
					<Right><EntypoIcon name="back-in-time" style={ { paddingRight:10, fontSize: 32 } } /></Right>
				</Header>

				<Content>
					<View style={{flexDirection:'row', paddingTop:10}}>
						<View style={{flex:1, alignItems:'center'}}>
							<Image source={{ url: 'https://steemitimages.com/u/anpigon/avatar' }}
									style={{width:75, height:75, borderRadius:37.5}}/>
						</View>
						<View style={{flex:3}}>
							<View style={{flexDirection:'row', justifyContent:'space-around'}}>
								<View style={{alignItems:'center'}}>
									<Text>{postCount}</Text>
									<Text style={{fontSize:10, color:'gray'}}>posts</Text>
								</View>
								<View style={{alignItems:'center'}}>
									<Text>{followerCount}</Text>
									<Text style={{fontSize:10, color:'gray'}}>follower</Text>
								</View>
								<View style={{alignItems:'center'}}>
									<Text>{followingCount}</Text>
									<Text style={{fontSize:10, color:'gray'}}>following</Text>
								</View>
							</View>
							<View style={{flexDirection:'row'}}>
								<Button bordered dark
										style={{flex:4, marginLeft:10, justifyContent:'center', height:30, marginTop:10}}>
									<Text>Edit Profile</Text>
								</Button>
								<Button bordered dark small icon
										style={{flex:1, marginRight:10, marginLeft:5, justifyContent:'center', height:30, marginTop:10}}>
									<Icon name="settings" />
								</Button>
							</View>
						</View>
					</View>

					<View style={{paddingHorizontal:10, paddingVertical:10}}>
						<Text style={{fontWeight:'bold'}}>{profile.name}</Text>
						<Text>{profile.about}</Text>
						<Text>{profile.website}</Text>
					</View>

					<View style={{ flexDirection: 'row', justifyContent:'space-around', borderTopWidth:1, borderTopColor:'#eae5e5' }}>
						<Button transparent
								onPress={ () => this.segmentClicked( 0 ) }
								active={ this.state.activeIndex === 0 }>
							<Icon name='ios-apps'
									style={ [ this.state.activeIndex === 0 ? {} : {color: 'grey' } ] } />
						</Button>
						<Button transparent
								onPress={ () => this.segmentClicked( 1 ) }
								active={ this.state.activeIndex === 1 }>
							<Icon name='ios-list'
									style={ [ this.state.activeIndex === 1 ? {} : {color: 'grey' } ] } />
						</Button>
						<Button transparent
								onPress={ () => this.segmentClicked( 2 ) }
								active={ this.state.activeIndex === 2 }>
							<Icon name='ios-people'
									style={ [ this.state.activeIndex === 2 ? {} : {color: 'grey' } ] } />
						</Button>
						<Button transparent
								onPress={ () => this.segmentClicked( 3 ) }
								active={ this.state.activeIndex === 3 }>
							<Icon name='ios-bookmark'
									style={ [ this.state.activeIndex === 3 ? {} : {color: 'grey' } ] } />
						</Button>
					</View>
					{ this.renderSection() }
				</Content>
			</Container>
		);
	}
}

const style = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	}
});
