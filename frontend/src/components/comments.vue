<template>
  <div class="comments-box">
    <div class="post-comment">
      <el-avatar
        :size="32"
        :src="user.avatar ? user.avatar : ''"
        :icon="user.avatar ? '' : 'el-icon-user-solid'"
        class="user-portrait" />
      <div class="post-comment-input-box">
        <input
          v-model="comment_content"
          placeholder="Write a comment..."
          class="post-comment-input"
          @keyup.enter="postComment" />
        <p>Press Enter to post.</p>
      </div>
    </div>

    <ul>
      <comment-item
        v-for="comment in firstTwoComments"
        :key="comment.id"
        :comment="comment" />
      <div v-if="restComments.length > 0" class="showMoreComments-btn">
        <el-button type="text" size="mini" @click="toggleShowMoreComments">
          <icon :name="showMoreComments ? 'collapse' : 'expand'" :size="20" />
        </el-button>
      </div>
      <div v-show="showMoreComments">
        <comment-item
          v-for="comment in restComments"
          :key="comment.id"
          :comment="comment" />
      </div>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import 'vue-awesome/icons/angle-double-right'
import 'vue-awesome/icons/angle-double-down'
import { addComment } from '@api/comment'
import { formatDate } from '@assets/utils.js'
import commentItem from './commentItem.vue'
import icon from './icon.vue'

export default {
  props: ['comments', 'postId'],
  components: {
    commentItem,
    icon
  },
  data () {
    return {
      showMoreComments: false,
      comment_content: ''
    }
  },
  computed: {
    _comments () {
      return this.comments.map(ele => {
        ele.created_at = formatDate(ele.created_at)
        return ele
      })
    },
    firstTwoComments () {
      return this._comments.slice(0, 2)
    },
    restComments () {
      return this._comments.slice(2)
    },
    ...mapState([
      'sid',
      'user'
    ])
  },
  methods: {
    toggleShowMoreComments () {
      this.showMoreComments = !this.showMoreComments
    },
    postComment () {
      addComment({
        sid: this.sid,
        post_id: this.postId,
        comment_content: this.comment_content
      }).then(() => {
        this.$emit('action-success', this.postId)
        this.comment_content = ''
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.comments-box
  padding 8px 0

.user-portrait
  margin-right 12px

.showMoreComments-btn
  text-align center

  .el-button
    padding 0 10px
    color #666

    &:hover
      color #409eff

.post-comment
  padding 8px 0
  display flex

  &-input-box
    flex 1

    p
      font-size 12px
      margin-top 8px
      padding-left 13px

  &-input
    width calc(100% - 24px)
    height 36px
    background-color #f0f2f5
    border 1px solid #dcdfe6
    border-radius 18px
    padding 0 12px
    outline none
</style>
