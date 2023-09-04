<!-- eslint-disable vue/multi-word-component-names -->

<template>
 <v-app>
      <v-container>
        <v-row>
          <v-col cols="6">
            <v-card>
              <v-card-title>Card 1</v-card-title>
              <v-card-text>
                Conteúdo do Card 1.
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary">Botão do Card 1</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card>
              <v-card-title>Card 2</v-card-title>
              <v-card-text>
                Conteúdo do Card 2.
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary">Botão do Card 2</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
</template>
<script>
export default {
    
}
</script>
<style>
    *{
        margin: 0;
    }
</style>