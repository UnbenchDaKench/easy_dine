<template>
    <f7-page name='dine'>
        <f7-block strong inset>
            <p >Please scan a restaurant, or selct from the </p>
            <a href='./' class='tab-link' data-route-tab-id='home'>restaurant list</a>
        </f7-block>  
    </f7-page>
</template>

<script>
export default {
    data(){
        return{
            notSelected: true
        }
    }
}
</script>