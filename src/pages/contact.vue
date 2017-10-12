<template>
	<section class="contact">
		<tiitle
			:title="'Contact'"
			:hero-image="{
				main: 'http://res.cloudinary.com/dwdoisdas/image/upload/v1506940510/Photo22_22_n7bs0r.jpg',
				opti: convertCloudinary({
					src: 'http://res.cloudinary.com/dwdoisdas/image/upload/v1506940510/Photo22_22_n7bs0r.jpg',
					effect: 'blur',
					amount: 2000
				})
			}"
		></tiitle>
		<div class="contact__info-container">
			<div class="contact__info-container-inner">
				<div v-for="element in storeData.fields" v-if="element.type === 'input'" class="contact__field">
					<h3 class="contact__title">{{element.title}}</h3>
					<input type="text" v-model="form[element.model]"/>
				</div>
				<div v-for="element in storeData.fields" v-if="element.type === 'textfield'" class="contact__field">
					<h3 class="contact__title">{{element.title}}</h3>
					<textarea type="text" class="contact__textarea" v-model="form[element.model]"/>
				</div>
				<div @click.stoppropagation="submit" class="contact__cta cta">{{storeData.cta.title}}</div>
			</div>
		</div>
	</section>
</template>

<script>
	import Tiitle from '@/components/title';
	import { mapState } from 'vuex';
	export default {
		name: 'Contact',
		props: [''],
		data () {
			return {
				form: {
					name: '',
					email: '',
					text: '',
				}
			}
		},
		components: {
			Tiitle
		},
		methods: {
			submit () {
//				nodemailer.createTestAccount((err, account) => {
//
//					// create reusable transporter object using the default SMTP transport
//					let transporter = nodemailer.createTransport({
//						host: 'smtp.ethereal.email',
//						port: 587,
//						secure: false, // true for 465, false for other ports
//						auth: {
//							user: account.user, // generated ethereal user
//							pass: account.pass  // generated ethereal password
//						}
//					});
//
//					// setup email data with unicode symbols
//					let mailOptions = {
//						from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
//						to: 'info@phillipparker.tech', // list of receivers
//						subject: 'Hello ✔', // Subject line
//						text: 'Hello world?', // plain text body
//						html: '<b>Hello world?</b>' // html body
//					};
//
//					// send mail with defined transport object
//					transporter.sendMail(mailOptions, (error, info) => {
//						if (error) {
//							return console.log(error);
//						}
//						console.log('Message sent: %s', info.messageId);
//						// Preview only available when sending through an Ethereal account
//						console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//
//						// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
//						// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//					});
//				});
			}
		},
		computed: {
			...mapState({
				storeData: state => state.localData.data.contact,
			}),
		},
	};
</script>

<style lang="scss" type="text/scss">
	@import '~@/assets/scss/settings/variables.scss';
	@import '~@/assets/scss/tools/mixins.scss';
	.contact {
		&__info-container {
			width: 100%;
		}
		&__info-container-inner {
			max-width: $column;
			margin: 0 auto;
			@include mq($column) {
				max-width: $mobileContainer;
			}
		}
		&__field {
			margin-bottom: em(20);
		}
		&__title {
			margin-bottom: em(10);
		}
		&__textarea {
			height: em(200);
		}
	}
</style>
